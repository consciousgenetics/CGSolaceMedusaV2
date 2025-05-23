// import { Modules } from "@medusajs/framework/utils";
// import { INotificationModuleService } from "@medusajs/framework/types";
// import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
// import { EmailTemplates } from "../modules/email-notifications/templates";
// import axios from "axios";
// // Import SendGrid directly
// import sgMail from "@sendgrid/mail";

import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  Modules,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";

// // The known publishable API key
// const PUBLISHABLE_API_KEY =
//   "pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c";
// // Admin email address
// const ADMIN_EMAIL = "info@consciousgenetics.com";

// // Initialize SendGrid
// if (process.env.SENDGRID_API_KEY) {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   console.log("💌 Customer notifier: SendGrid initialized");
// } else {
//   console.error("❌ Customer notifier: SENDGRID_API_KEY is not set!");
// }

// // Fetch order data with retry mechanism
// async function fetchOrderWithRetry(baseUrl, orderId, retry = 3, delay = 2000) {
//   const publishableKey = PUBLISHABLE_API_KEY;
//   const apiToken =
//     process.env.MEDUSA_ADMIN_API_TOKEN || process.env.COOKIE_SECRET;

//   for (let attempt = 1; attempt <= retry; attempt++) {
//     try {
//       console.log(
//         `🔍 Customer notifier: Fetching order via store API (attempt ${attempt}/${retry}): ${orderId}`
//       );
//       const response = await axios.get(`${baseUrl}/store/orders/${orderId}`, {
//         headers: {
//           "x-publishable-api-key": publishableKey,
//         },
//       });
//       console.log(
//         "✅ Customer notifier: Order fetched successfully via store API"
//       );
//       return response.data.order;
//     } catch (storeErr) {
//       console.error(
//         `❌ Customer notifier: Store API failed (attempt ${attempt}/${retry}):`,
//         storeErr.message
//       );

//       // If this is the last store API attempt, try admin API
//       if (attempt === retry) {
//         try {
//           console.log(
//             `🔍 Customer notifier: Fetching order via admin API: ${orderId}`
//           );
//           const response = await axios.get(
//             `${baseUrl}/admin/orders/${orderId}`,
//             {
//               headers: {
//                 "x-medusa-access-token": apiToken,
//               },
//             }
//           );
//           console.log(
//             "✅ Customer notifier: Order fetched successfully via admin API"
//           );
//           return response.data.order;
//         } catch (adminErr) {
//           console.error(
//             "❌ Customer notifier: Admin API failed:",
//             adminErr.message
//           );
//           throw new Error("Both API methods failed");
//         }
//       }

//       // Wait before retrying
//       console.log(
//         `🔄 Customer notifier: Waiting ${delay / 1000}s before retry...`
//       );
//       await new Promise((resolve) => setTimeout(resolve, delay));
//     }
//   }
// }

// export default async function orderPlacedHandler({
//   event,
//   container,
// }: SubscriberArgs<any>) {
//   try {
//     console.log("🔔 Customer notifier received event:", event.name);

//     // Only process order.placed events - we're now using the event-bridge to convert LinkOrderCart events
//     if (event.name !== "order.placed") {
//       console.log(`Customer notifier ignoring event ${event.name}`);
//       return;
//     }

//     // Extract data from the event
//     const { data } = event;
//     console.log(
//       "Customer notifier processing order event:",
//       JSON.stringify(data || {}, null, 2)
//     );

//     if (!data || !data.id) {
//       console.error("❌ Customer notifier: Invalid data received");
//       return;
//     }

//     // Use the notification module directly
//     const notificationModuleService = container.resolve(Modules.NOTIFICATION);
//     const baseUrl = process.env.BACKEND_URL || "http://localhost:9000";

//     // For order.placed events, use the order ID directly
//     const orderId = data.id;

//     // Fetch order data with retries
//     let order;
//     try {
//       order = await fetchOrderWithRetry(baseUrl, orderId);
//     } catch (err) {
//       console.error(
//         "❌ Customer notifier: All API attempts failed, using fallback:",
//         err.message
//       );

//       // Last resort - use the order data from the event if available
//       if (data.email && data.items) {
//         console.log(
//           "🔄 Customer notifier: Using order data from event as fallback"
//         );
//         order = data;
//       } else if (data.result && data.result.order) {
//         console.log(
//           "🔄 Customer notifier: Using order data from cart completion result"
//         );
//         order = data.result.order;
//       } else {
//         // Wait a bit longer before giving up completely - the order may still be processing
//         console.log(
//           "🕒 Customer notifier: Waiting 5s for order to be fully processed..."
//         );
//         await new Promise((resolve) => setTimeout(resolve, 5000));

//         try {
//           // One final attempt after waiting
//           order = await fetchOrderWithRetry(baseUrl, orderId, 1);
//         } catch (finalErr) {
//           // If all failed, create a minimal order object for logging purposes
//           console.log(
//             "🔄 Customer notifier: Creating minimal order object from ID"
//           );
//           order = {
//             id: orderId,
//             email: process.env.ADMIN_EMAIL || "info@consciousgenetics.com", // Send to admin as fallback
//             ...data, // Include any other data from the event
//           };
//         }
//       }
//     }

//     if (!order) {
//       console.error(
//         "❌ Customer notifier: Order not found or could not be retrieved"
//       );
//       return;
//     }

//     // Don't proceed if we still don't have essential data
//     if (!order.total || !order.subtotal) {
//       console.error(
//         "❌ Customer notifier: Critical order data missing, cannot format email"
//       );

//       // Only proceed with admin notification about the issue
//       try {
//         const msg = {
//           to: ADMIN_EMAIL,
//           from: process.env.SENDGRID_FROM || "info@consciousgenetics.com",
//           subject: `⚠️ Order Processing Issue: #${
//             order.display_id || order.id
//           }`,
//           text: `An order (${order.id}) was placed but the system couldn't retrieve complete details. Manual follow-up required.`,
//         };

//         if (process.env.SENDGRID_API_KEY) {
//           await sgMail.send(msg);
//           console.log("✅ Admin alert sent about order data issue");
//         }
//       } catch (alertErr) {
//         console.error("❌ Failed to send admin alert:", alertErr);
//       }

//       return;
//     }

//     console.log(
//       "Customer notifier: Order retrieved successfully:",
//       `ID: ${order.id}, ` +
//         `Customer: ${order.email}, ` +
//         `Total: ${order.total}`
//     );

//     // Use the order data directly
//     const shippingAddress = order.shipping_address || {};

//     // Log original price values for debugging
//     console.log("💰 Customer notifier: Original price values:", {
//       subtotal: order.subtotal,
//       tax_total: order.tax_total,
//       shipping_total: order.shipping_total,
//       discount_total: order.discount_total,
//       total: order.total,
//     });

//     // Format the order for the template
//     const formattedOrder = formatOrderForTemplate(order);

//     // Log formatted price values
//     console.log("💵 Customer notifier: Formatted price values:", {
//       subtotal: formattedOrder.subtotal,
//       tax_total: formattedOrder.tax_total,
//       shipping_total: formattedOrder.shipping_total,
//       discount_total: formattedOrder.discount_total,
//       total: formattedOrder.total,
//     });

//     // Only proceed if we have a valid email
//     if (!order.email) {
//       console.error("❌ Customer notifier: Order is missing email address");
//       return;
//     }

//     try {
//       console.log("📧 Customer notifier: Sending email to:", order.email);
//       console.log(
//         "📄 Customer notifier: Using template ID:",
//         process.env.SENDGRID_ORDER_PLACED_ID
//       );

//       // First try using Medusa's notification module for customer email
//       try {
//         await notificationModuleService.createNotifications({
//           to: order.email,
//           channel: "email",
//           template: process.env.SENDGRID_ORDER_PLACED_ID,
//           data: {
//             emailOptions: {
//               from: process.env.SENDGRID_FROM || "info@consciousgenetics.com",
//               replyTo: "info@consciousgenetics.com",
//               subject: "Your order has been placed",
//             },
//             order: formattedOrder,
//             shippingAddress,
//             preview: "Thank you for your order!",
//           },
//         });
//         console.log(
//           "✅ Customer notifier: Email sent successfully via Medusa notification module"
//         );
//       } catch (medusaError) {
//         console.error(
//           "❌ Customer notifier: Error sending via Medusa module:",
//           medusaError
//         );

//         // If Medusa's notification fails, try sending directly via SendGrid
//         console.log(
//           "🔄 Customer notifier: Falling back to direct SendGrid API..."
//         );

//         // Use SendGrid directly as a fallback for customer
//         const msg = {
//           to: order.email,
//           from: process.env.SENDGRID_FROM || "info@consciousgenetics.com",
//           templateId: process.env.SENDGRID_ORDER_PLACED_ID,
//           dynamicTemplateData: {
//             order: formattedOrder,
//             shippingAddress,
//             preview: "Thank you for your order!",
//           },
//         };

// await sgMail.send(msg);
//         console.log(
//           "✅ Customer notifier: Email sent successfully via direct SendGrid API"
//         );
//       }
//     } catch (error) {
//       console.error(
//         "❌ Customer notifier: All email sending attempts failed:",
//         error
//       );

//       // Log detailed error information
//       if (error instanceof Error) {
//         console.error("❌ Customer notifier: Error details:", {
//           name: error.name,
//           message: error.message,
//           stack: error.stack,
//         });
//       }
//     }
//   } catch (error) {
//     console.error("❌ Customer notifier: Unhandled error:", error);
//   }
// }

// /**
//  * Format monetary values properly from cents to dollars/pounds
//  */
// function formatMoney(value) {
//   if (value === null || value === undefined) {
//     return "0.00";
//   }

//   // Make sure we're working with a number
//   const numValue = typeof value === "string" ? parseFloat(value) : value;

//   // Check if the value is already in dollars/pounds format
//   // If the value is small (e.g., 10.98 instead of 1098), assume it's already formatted
//   if (numValue < 100 && numValue % 1 !== 0) {
//     // Value is likely already in dollars/pounds format (has decimals and is small)
//     return numValue.toFixed(2);
//   } else {
//     // Value is likely in cents, convert to dollars/pounds
//     return (numValue / 100).toFixed(2);
//   }
// }

// /**
//  * Format the order object for the email template
//  */
// function formatOrderForTemplate(order) {
//   // Format the order items
//   const formattedItems = order.items
//     ? order.items.map((item) => ({
//         ...item,
//         unit_price: formatMoney(item.unit_price),
//         title: item.title || item.variant?.title || "",
//         variant: item.variant || {},
//       }))
//     : [];

//   // Return the formatted order object
//   return {
//     ...order,
//     display_id: order.display_id || order.id,
//     total: formatMoney(order.total),
//     subtotal: formatMoney(order.subtotal),
//     tax_total: formatMoney(order.tax_total),
//     shipping_total: formatMoney(order.shipping_total),
//     discount_total: formatMoney(order.discount_total || 0),
//     items: formattedItems,
//   };
// }

// Now ONLY listen for order.placed events - the event-bridge will convert LinkOrderCart events

export default async function placeOrder({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);

  const fields = [
    "id",
    "version",
    "display_id",
    "status",
    "currency_code",
    "created_at",
    "updated_at",
    "original_item_total",
    "original_item_subtotal",
    "original_item_tax_total",
    "item_total",
    "item_subtotal",
    "item_tax_total",
    "original_total",
    "original_subtotal",
    "original_tax_total",
    "total",
    "subtotal",
    "tax_total",
    "discount_subtotal",
    "discount_total",
    "discount_tax_total",
    "gift_card_total",
    "gift_card_tax_total",
    "shipping_total",
    "shipping_subtotal",
    "shipping_tax_total",
    "original_shipping_total",
    "original_shipping_subtotal",
    "original_shipping_tax_total",
    "raw_original_item_total",
    "raw_original_item_subtotal",
    "raw_original_item_tax_total",
    "raw_item_total",
    "raw_item_subtotal",
    "raw_item_tax_total",
    "raw_original_total",
    "raw_original_subtotal",
    "raw_original_tax_total",
    "raw_total",
    "raw_subtotal",
    "raw_tax_total",
    "raw_discount_total",
    "raw_discount_tax_total",
    "raw_gift_card_total",
    "raw_gift_card_tax_total",
    "raw_shipping_total",
    "raw_shipping_subtotal",
    "raw_shipping_tax_total",
    "raw_original_shipping_total",
    "raw_original_shipping_subtotal",
    "raw_original_shipping_tax_total",
    "shipping_address.*",
    "billing_address.*",
    "customer.*",
    "items.*",
  ];

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order",
    variables: {
      filters: {
        id: data.id,
      },
    },
    fields,
  });

  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const [order] = await remoteQuery(queryObject);

  await notificationModuleService.createNotifications({
    to: order.customer.email,
    channel: "email",
    template: process.env.SENDGRID_ORDER_PLACED_ID,
     data: order,
  });

  await notificationModuleService.createNotifications({
    to: "info@consciousgenetics.com",
    channel: "email",
    template: process.env.SENDGRID_ADMIN_NOTIFICATION_ID,
    data: order,
  });
}
export const config: SubscriberConfig = {
  event: "order.placed",
};
