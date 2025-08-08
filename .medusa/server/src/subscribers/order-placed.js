"use strict";
// import { Modules } from "@medusajs/framework/utils";
// import { INotificationModuleService } from "@medusajs/framework/types";
// import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
// import { EmailTemplates } from "../modules/email-notifications/templates";
// import axios from "axios";
// // Import SendGrid directly
// import sgMail from "@sendgrid/mail";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = placeOrder;
const utils_1 = require("@medusajs/framework/utils");
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
async function placeOrder({ event: { data }, container, }) {
    const notificationModuleService = container.resolve(utils_1.Modules.NOTIFICATION);
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
    const queryObject = (0, utils_1.remoteQueryObjectFromString)({
        entryPoint: "order",
        variables: {
            filters: {
                id: data.id,
            },
        },
        fields,
    });
    const remoteQuery = container.resolve(utils_1.ContainerRegistrationKeys.REMOTE_QUERY);
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
exports.config = {
    event: "order.placed",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL29yZGVyLXBsYWNlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdURBQXVEO0FBQ3ZELDBFQUEwRTtBQUMxRSx1RUFBdUU7QUFDdkUsNkVBQTZFO0FBQzdFLDZCQUE2QjtBQUM3Qiw4QkFBOEI7QUFDOUIsdUNBQXVDOzs7QUF3V3ZDLDZCQTJGQztBQWhjRCxxREFJbUM7QUFFbkMsbUNBQW1DO0FBQ25DLDhCQUE4QjtBQUM5QiwyRUFBMkU7QUFDM0UseUJBQXlCO0FBQ3pCLG9EQUFvRDtBQUVwRCx5QkFBeUI7QUFDekIsc0NBQXNDO0FBQ3RDLG9EQUFvRDtBQUNwRCwrREFBK0Q7QUFDL0QsV0FBVztBQUNYLHdFQUF3RTtBQUN4RSxJQUFJO0FBRUosMkNBQTJDO0FBQzNDLGtGQUFrRjtBQUNsRixnREFBZ0Q7QUFDaEQscUJBQXFCO0FBQ3JCLHVFQUF1RTtBQUV2RSx5REFBeUQ7QUFDekQsWUFBWTtBQUNaLHFCQUFxQjtBQUNyQix5R0FBeUc7QUFDekcsV0FBVztBQUNYLGlGQUFpRjtBQUNqRixxQkFBcUI7QUFDckIscURBQXFEO0FBQ3JELGFBQWE7QUFDYixZQUFZO0FBQ1oscUJBQXFCO0FBQ3JCLDBFQUEwRTtBQUMxRSxXQUFXO0FBQ1gsb0NBQW9DO0FBQ3BDLDJCQUEyQjtBQUMzQix1QkFBdUI7QUFDdkIsa0ZBQWtGO0FBQ2xGLDJCQUEyQjtBQUMzQixXQUFXO0FBRVgsZ0VBQWdFO0FBQ2hFLGlDQUFpQztBQUNqQyxnQkFBZ0I7QUFDaEIseUJBQXlCO0FBQ3pCLCtFQUErRTtBQUMvRSxlQUFlO0FBQ2YsOENBQThDO0FBQzlDLG9EQUFvRDtBQUNwRCxnQkFBZ0I7QUFDaEIsMkJBQTJCO0FBQzNCLHFEQUFxRDtBQUNyRCxtQkFBbUI7QUFDbkIsZ0JBQWdCO0FBQ2hCLGVBQWU7QUFDZix5QkFBeUI7QUFDekIsOEVBQThF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