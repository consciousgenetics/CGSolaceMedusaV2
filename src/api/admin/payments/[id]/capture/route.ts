import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys, Modules, remoteQueryObjectFromString } from "@medusajs/framework/utils";

export async function POST(
  req: MedusaRequest<{ payment_id?: string }>,
  res: MedusaResponse
) {
  try {
    console.log("🔴 Admin payment capture API called");
    
    const paymentId = req.params.id;
    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required"
      });
    }

    console.log("💳 Capturing payment:", paymentId);

    // Get the Payment Module service
    const paymentModuleService = req.scope.resolve(Modules.PAYMENT);

    // Use the proper capturePayment method that should trigger workflows/events
    const payment = await paymentModuleService.capturePayment({
      payment_id: paymentId,
    });

    console.log("✅ Payment captured successfully:", payment.id);

    // Attempt to send the payment captured email immediately (in addition to subscriber)
    try {
      const templateId = process.env.SENDGRID_PAYMENT_CAPTURED_ID;
      if (!templateId) {
        console.error("❌ SENDGRID_PAYMENT_CAPTURED_ID is not set in environment variables");
      } else {
        const notificationModuleService = req.scope.resolve(Modules.NOTIFICATION);
        const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY);

        // Fetch payment details to get payment_collection_id
        const basicPaymentQuery = remoteQueryObjectFromString({
          entryPoint: "payment",
          variables: {
            filters: { id: paymentId },
          },
          fields: ["id", "amount", "currency_code", "order_id", "captured_at", "payment_collection_id"],
        });
        const [basicPayment] = await remoteQuery(basicPaymentQuery);

        if (!basicPayment) {
          console.error("❌ Payment not found when sending email:", paymentId);
        } else if (!basicPayment.payment_collection_id) {
          console.error("❌ Payment has no payment_collection_id:", basicPayment);
        } else {
          // Try to get the order from the payment collection
          const paymentCollectionQuery = remoteQueryObjectFromString({
            entryPoint: "payment_collection",
            variables: {
              filters: { id: basicPayment.payment_collection_id },
            },
            fields: ["id", "order_id", "order.*", "order.items.*"],
          });
          const [paymentCollection] = await remoteQuery(paymentCollectionQuery);

          let order = paymentCollection?.order;
          if (!order && paymentCollection?.order_id) {
            const orderQuery = remoteQueryObjectFromString({
              entryPoint: "order",
              variables: {
                filters: { id: paymentCollection.order_id },
              },
              fields: [
                "id",
                "display_id",
                "email",
                "currency_code",
                "total",
                "subtotal",
                "shipping_total",
                "tax_total",
                "discount_total",
                "customer.*",
                "shipping_address.*",
                "billing_address.*",
                "items.*",
                "items.title",
                "items.quantity",
                "items.unit_price",
                "summary.*",
              ],
            });
            const [queriedOrder] = await remoteQuery(orderQuery);
            order = queriedOrder;
          }

          if (!order) {
            console.error("❌ Order not found for payment collection:", basicPayment.payment_collection_id);
          } else {
            const customerEmail = order.customer?.email || order.email;
            if (!customerEmail) {
              console.error("❌ No customer email found for order:", order.id);
            } else {
              console.log("📨 Attempting to send payment captured email (from capture route)...");
              console.log("📧 Sending to email:", customerEmail);

              // Prepare minimal email data; avoid hardcoding prices
              const emailData = {
                emailOptions: {
                  subject: `Payment Received - Order #${order.display_id}`,
                },
                order: {
                  ...order,
                  customer: {
                    email: customerEmail,
                  },
                  summary: {
                    raw_current_order_total: {
                      value: basicPayment.amount,
                    },
                  },
                },
                shippingAddress: order.shipping_address || undefined,
                preview: "Your payment has been received!",
                currentYear: new Date().getFullYear(),
              };

              await notificationModuleService.createNotifications({
                to: customerEmail,
                channel: "email",
                template: templateId,
                data: emailData,
              });

              console.log(`✅ Payment captured email sent for order ${order.display_id} to ${customerEmail}`);
            }
          }
        }
      }
    } catch (sendErr) {
      console.error("❌ Failed to send payment captured email after capture:", sendErr);
      // Do not fail the capture response due to email issues
    }

    return res.status(200).json({
      success: true,
      payment: payment,
      message: "Payment captured successfully",
    });

  } catch (error) {
    console.error("❌ Payment capture failed:", error);
    
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to capture payment",
      error: error
    });
  }
}