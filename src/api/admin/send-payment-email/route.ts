import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  Modules,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";

/**
 * Manual API endpoint to send payment captured email
 * Usage: POST /admin/send-payment-email
 * Body: { "payment_id": "pay_xxxxx" }
 */
export async function POST(
  req: MedusaRequest<{ payment_id: string }>,
  res: MedusaResponse
) {
  try {
    const { payment_id } = req.body;
    
    if (!payment_id) {
      return res.status(400).json({ 
        success: false, 
        message: "payment_id is required" 
      });
    }

    console.log("🔧 Manual payment email trigger for:", payment_id);

    // Check if template ID is configured
    const templateId = process.env.SENDGRID_PAYMENT_CAPTURED_ID;
    if (!templateId) {
      console.error("❌ SENDGRID_PAYMENT_CAPTURED_ID is not set in environment variables");
      return res.status(500).json({
        success: false,
        message: "Email template not configured"
      });
    }
    console.log("📧 Using template ID:", templateId);

    const container = req.scope;
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);

    // Get basic payment info
    const basicPaymentQuery = remoteQueryObjectFromString({
      entryPoint: "payment",
      variables: {
        filters: {
          id: payment_id,
        },
      },
      fields: ["id", "amount", "currency_code", "order_id", "captured_at", "payment_collection_id"],
    });

    const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
    const [basicPayment] = await remoteQuery(basicPaymentQuery);
    
    console.log("💳 Basic payment info:", JSON.stringify(basicPayment, null, 2));

    if (!basicPayment) {
      console.error("❌ Payment not found:", payment_id);
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    // Get the order using the order_id from payment
    if (!basicPayment.order_id) {
      console.error("❌ Payment has no order_id:", basicPayment);
      return res.status(400).json({
        success: false,
        message: "Payment has no associated order"
      });
    }

    const orderQuery = remoteQueryObjectFromString({
      entryPoint: "order",
      variables: {
        filters: {
          id: basicPayment.order_id,
        },
      },
      fields: [
        "id",
        "display_id", 
        "email",
        "currency_code",
        "total",
        "customer.*",
        "shipping_address.*",
        "billing_address.*",
        "items.*",
        "summary.*"
      ],
    });

    const [order] = await remoteQuery(orderQuery);
    
    if (!order) {
      console.error("❌ Order not found for payment:", basicPayment.order_id);
      return res.status(404).json({
        success: false,
        message: "Order not found for payment"
      });
    }

    console.log("📦 Order found:", order.display_id, "Customer:", order.customer?.email);

    // Combine payment and order data
    const payment = {
      ...basicPayment,
      order: order
    };

    // Send email notification to customer
    console.log("📨 Attempting to send payment captured email...");
    await notificationModuleService.createNotifications({
      to: payment.order.customer.email,
      channel: "email",
      template: templateId,
      data: {
        emailOptions: {
          subject: `Payment Received - Order #${payment.order.display_id}`,
        },
        order: {
          ...payment.order,
          summary: {
            raw_current_order_total: {
              value: payment.amount,
            },
          },
        },
        shippingAddress: payment.order.shipping_address,
        preview: "Your payment has been received!",
        currentYear: new Date().getFullYear(),
      },
    });

    console.log(`✅ Payment captured email sent for order ${payment.order.display_id} to ${payment.order.customer.email}`);
    
    return res.json({
      success: true,
      message: `Payment captured email sent to ${payment.order.customer.email}`,
      order_id: payment.order.display_id,
      payment_id: payment_id
    });

  } catch (error) {
    console.error("❌ Failed to send payment captured email manually:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message
    });
  }
}