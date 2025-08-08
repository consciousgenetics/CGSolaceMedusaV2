"use strict";
// import { Modules } from "@medusajs/framework/utils";
// import { INotificationModuleService } from "@medusajs/framework/types";
// import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
// import { EmailTemplates } from "../modules/email-notifications/templates";
// import axios from "axios";
// // Import SendGrid directly
// import sgMail from "@sendgrid/mail";
Object.defineProperty(exports, "__esModule", { value: true });
// import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
// import {
//   ContainerRegistrationKeys,
//   Modules,
//   remoteQueryObjectFromString,
// } from "@medusajs/framework/utils";
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
// export default async function placeOrder({
//   event: { data },
//   container,
// }: SubscriberArgs<{ id: string }>) {
//   const notificationModuleService = container.resolve(Modules.NOTIFICATION);
//   const fields = [
//     "id",
//     "version",
//     "display_id",
//     "status",
//     "currency_code",
//     "created_at",
//     "updated_at",
//     "original_item_total",
//     "original_item_subtotal",
//     "original_item_tax_total",
//     "item_total",
//     "item_subtotal",
//     "item_tax_total",
//     "original_total",
//     "original_subtotal",
//     "original_tax_total",
//     "total",
//     "subtotal",
//     "tax_total",
//     "discount_subtotal",
//     "discount_total",
//     "discount_tax_total",
//     "gift_card_total",
//     "gift_card_tax_total",
//     "shipping_total",
//     "shipping_subtotal",
//     "shipping_tax_total",
//     "original_shipping_total",
//     "original_shipping_subtotal",
//     "original_shipping_tax_total",
//     "raw_original_item_total",
//     "raw_original_item_subtotal",
//     "raw_original_item_tax_total",
//     "raw_item_total",
//     "raw_item_subtotal",
//     "raw_item_tax_total",
//     "raw_original_total",
//     "raw_original_subtotal",
//     "raw_original_tax_total",
//     "raw_total",
//     "raw_subtotal",
//     "raw_tax_total",
//     "raw_discount_total",
//     "raw_discount_tax_total",
//     "raw_gift_card_total",
//     "raw_gift_card_tax_total",
//     "raw_shipping_total",
//     "raw_shipping_subtotal",
//     "raw_shipping_tax_total",
//     "raw_original_shipping_total",
//     "raw_original_shipping_subtotal",
//     "raw_original_shipping_tax_total",
//     "customer.*",
//     "items.*",
//   ];
//   const queryObject = remoteQueryObjectFromString({
//     entryPoint: "order",
//     variables: {
//       filters: {
//         id: data.id,
//       },
//     },
//     fields,
//   });
//   const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
//   const [order] = await remoteQuery(queryObject);
//   await notificationModuleService.createNotifications({
//     to: order.customer.email,
//     channel: "email",
//     template: process.env.SENDGRID_ORDER_PLACED_ID,
//     data: order,
//   });
//   await notificationModuleService.createNotifications({
//     to: "info@consciousgenetics.com",
//     channel: "email",
//     template: process.env.SENDGRID_ADMIN_NOTIFICATION_ID,
//     data: order,
//   });
// }
// export const config: SubscriberConfig = {
//   event: "order.placed",
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtYnJpZGdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL2V2ZW50LWJyaWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdURBQXVEO0FBQ3ZELDBFQUEwRTtBQUMxRSx1RUFBdUU7QUFDdkUsNkVBQTZFO0FBQzdFLDZCQUE2QjtBQUM3Qiw4QkFBOEI7QUFDOUIsdUNBQXVDOztBQUV2QywrRUFBK0U7QUFDL0UsV0FBVztBQUNYLCtCQUErQjtBQUMvQixhQUFhO0FBQ2IsaUNBQWlDO0FBQ2pDLHNDQUFzQztBQUV0QyxtQ0FBbUM7QUFDbkMsOEJBQThCO0FBQzlCLDJFQUEyRTtBQUMzRSx5QkFBeUI7QUFDekIsb0RBQW9EO0FBRXBELHlCQUF5QjtBQUN6QixzQ0FBc0M7QUFDdEMsb0RBQW9EO0FBQ3BELCtEQUErRDtBQUMvRCxXQUFXO0FBQ1gsd0VBQXdFO0FBQ3hFLElBQUk7QUFFSiwyQ0FBMkM7QUFDM0Msa0ZBQWtGO0FBQ2xGLGdEQUFnRDtBQUNoRCxxQkFBcUI7QUFDckIsdUVBQXVFO0FBRXZFLHlEQUF5RDtBQUN6RCxZQUFZO0FBQ1oscUJBQXFCO0FBQ3JCLHlHQUF5RztBQUN6RyxXQUFXO0FBQ1gsaUZBQWlGO0FBQ2pGLHFCQUFxQjtBQUNyQixxREFBcUQ7QUFDckQsYUFBYTtBQUNiLFlBQVk7QUFDWixxQkFBcUI7QUFDckIsMEVBQTBFO0FBQzFFLFdBQVc7QUFDWCxvQ0FBb0M7QUFDcEMsMkJBQTJCO0FBQzNCLHVCQUF1QjtBQUN2QixrRkFBa0Y7QUFDbEYsMkJBQTJCO0FBQzNCLFdBQVc7QUFFWCxnRUFBZ0U7QUFDaEUsaUNBQWlDO0FBQ2pDLGdCQUFnQjtBQUNoQix5QkFBeUI7QUFDekIsK0VBQStFO0FBQy9FLGVBQWU7QUFDZiw4Q0FBOEM7QUFDOUMsb0RBQW9EO0FBQ3BELGdCQUFnQjtBQUNoQiwyQkFBMkI7QUFDM0IscURBQXFEO0FBQ3JELG1CQUFtQjtBQUNu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