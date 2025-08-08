import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  Modules,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";

/**
 * Manual API endpoint to send payment captured email (store route - no auth required)
 * Usage: POST /store/send-payment-email
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

    // Get the order using the payment_collection_id
    if (!basicPayment.payment_collection_id) {
      console.error("❌ Payment has no payment_collection_id:", basicPayment);
      return res.status(400).json({
        success: false,
        message: "Payment has no associated payment collection"
      });
    }

    console.log("🔍 Looking for payment collection:", basicPayment.payment_collection_id);

    // First get the payment collection to find the order
    const paymentCollectionQuery = remoteQueryObjectFromString({
      entryPoint: "payment_collection",
      variables: {
        filters: {
          id: basicPayment.payment_collection_id,
        },
      },
      fields: ["id", "order_id", "order.*", "order.items.*"],
    });

    const [paymentCollection] = await remoteQuery(paymentCollectionQuery);
    
    if (!paymentCollection) {
      console.error("❌ Payment collection not found:", basicPayment.payment_collection_id);
      return res.status(404).json({
        success: false,
        message: "Payment collection not found"
      });
    }

    console.log("💰 Payment collection info:", JSON.stringify(paymentCollection, null, 2));

    // If order is included in payment collection, use it directly
    let order = paymentCollection.order;
    
    // If not, query for it using order_id
    if (!order && paymentCollection.order_id) {
      console.log("🔍 Querying order by ID:", paymentCollection.order_id);
      const orderQuery = remoteQueryObjectFromString({
        entryPoint: "order",
        variables: {
          filters: {
            id: paymentCollection.order_id,
          },
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
          "summary.*"
        ],
      });

      const [queriedOrder] = await remoteQuery(orderQuery);
      order = queriedOrder;
    }
    
    if (!order) {
      console.error("❌ Order not found for payment collection:", basicPayment.payment_collection_id);
      return res.status(404).json({
        success: false,
        message: "Order not found for payment"
      });
    }

    console.log("📦 Order found:", order.display_id, "Customer:", order.customer?.email);
    console.log("📋 Order items:", JSON.stringify(order.items, null, 2));

    // Combine payment and order data
    const payment = {
      ...basicPayment,
      order: order
    };

    // Send email notification to customer
    console.log("📨 Attempting to send payment captured email...");
    
    // Use order.email directly since customer object might not be loaded
    const customerEmail = payment.order.customer?.email || payment.order.email;
    if (!customerEmail) {
      console.error("❌ No customer email found");
      return res.status(400).json({
        success: false,
        message: "No customer email found"
      });
    }
    
    console.log("📧 Sending to email:", customerEmail);
    
    // Get shipping address details
    let shippingAddress = null;
    if (payment.order.shipping_address_id) {
      const addressQuery = remoteQueryObjectFromString({
        entryPoint: "address",
        variables: {
          filters: {
            id: payment.order.shipping_address_id,
          },
        },
        fields: ["id", "first_name", "last_name", "address_1", "address_2", "city", "province", "postal_code", "country_code"],
      });

      const [address] = await remoteQuery(addressQuery);
      shippingAddress = address;
    }

    console.log("🏠 Shipping address:", JSON.stringify(shippingAddress, null, 2));

    // Prepare the data object that will be sent to SendGrid
    const emailData = {
      emailOptions: {
        subject: `Payment Received - Order #${payment.order.display_id}`,
      },
      order: {
        ...payment.order,
        customer: {
          email: customerEmail, // Ensure customer email is available
        },
        summary: {
          raw_current_order_total: {
            value: payment.amount,
          },
        },
        // Add currency symbol for template
        currency_symbol: payment.order.currency_code === 'USD' ? '$' : '£',
      },
      shippingAddress: shippingAddress || {
        first_name: "N/A",
        last_name: "",
        address_1: "Address not available",
        city: "",
        province: "",
        postal_code: "",
        country_code: ""
      },
      preview: "Your payment has been received!",
      currentYear: new Date().getFullYear(),
    };

    console.log("📤 Complete data being sent to SendGrid:", JSON.stringify(emailData, null, 2));

    await notificationModuleService.createNotifications({
      to: customerEmail,
      channel: "email",
      template: templateId,
      data: emailData,
    });

    console.log(`✅ Payment captured email sent for order ${payment.order.display_id} to ${customerEmail}`);
    
    return res.json({
      success: true,
      message: `Payment captured email sent to ${customerEmail}`,
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