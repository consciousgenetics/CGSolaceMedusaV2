import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  Modules,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";
import { EmailTemplates } from "../modules/email-notifications/templates";

export default async function paymentCapturedHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("🔔 Payment event received:", event.name, "Data:", JSON.stringify(event.data || {}, null, 2));
  console.log("🔔 Full event object:", JSON.stringify(event, null, 2));
  
  const { data } = event;
  
  // Check if template ID is configured
  const templateId = process.env.SENDGRID_PAYMENT_CAPTURED_ID;
  if (!templateId) {
    console.error("❌ SENDGRID_PAYMENT_CAPTURED_ID is not set in environment variables");
    return;
  }
  console.log("📧 Using template ID:", templateId);
  
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);

  // First, let's get basic payment info to debug
  const basicPaymentQuery = remoteQueryObjectFromString({
    entryPoint: "payment",
    variables: {
      filters: {
        id: data.id,
      },
    },
    fields: ["id", "amount", "currency_code", "order_id", "captured_at", "payment_collection_id"],
  });

  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const [basicPayment] = await remoteQuery(basicPaymentQuery);
  
  console.log("💳 Basic payment info:", JSON.stringify(basicPayment, null, 2));

  if (!basicPayment) {
    console.error("❌ Payment not found:", data.id);
    return;
  }

  // Now get the order using the payment_collection_id from payment
  if (!basicPayment.payment_collection_id) {
    console.error("❌ Payment has no payment_collection_id:", basicPayment);
    return;
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
    fields: ["id", "order_id", "order.*"],
  });

  const [paymentCollection] = await remoteQuery(paymentCollectionQuery);
  
  if (!paymentCollection) {
    console.error("❌ Payment collection not found:", basicPayment.payment_collection_id);
    return;
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
        "customer.*",
        "shipping_address.*",
        "billing_address.*",
        "items.*",
        "summary.*"
      ],
    });

    const [queriedOrder] = await remoteQuery(orderQuery);
    order = queriedOrder;
  }
  
  if (!order) {
    console.error("❌ Order not found for payment collection:", basicPayment.payment_collection_id);
    return;
  }

  console.log("📦 Order found:", order.display_id, "Customer:", order.customer?.email);

  // Combine payment and order data
  const payment = {
    ...basicPayment,
    order: order
  };

  // Check if payment has actually been captured
  if (!payment.captured_at && event.name !== "capture.created") {
    console.log("💡 Payment not yet captured, skipping email");
    return;
  }

  try {
    // Send email notification to customer
    console.log("📨 Attempting to send payment captured email...");
    
    // Use order.email directly since customer object might not be loaded
    const customerEmail = payment.order.customer?.email || payment.order.email;
    if (!customerEmail) {
      console.error("❌ No customer email found");
      return;
    }
    
    console.log("📧 Sending to email:", customerEmail);
    
    await notificationModuleService.createNotifications({
      to: customerEmail,
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

    console.log(`✅ Payment captured email sent for order ${payment.order.display_id} to ${customerEmail}`);
  } catch (error) {
    console.error("❌ Failed to send payment captured email:", error);
    throw error;
  }
}

export const config: SubscriberConfig = {
  event: [
    "payment.captured",
    "payment.updated", 
    "payment_collection.updated",
    "capture.created",
    // Let's also listen to all payment events to debug
    "payment.*",
    "payment_collection.*"
  ],
};