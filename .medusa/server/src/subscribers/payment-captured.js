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
exports.default = paymentCapturedHandler;
const utils_1 = require("@medusajs/framework/utils");
// Track recently processed payments to avoid duplicate sends on at-least-once delivery
const processedPaymentIds = new Set();
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
//     // Only process payment.captured events - we're now using the event-bridge to convert LinkOrderCart events
//     if (event.name !== "payment.captured") {
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
//     // For payment.captured events, use the order ID directly
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
//         process.env.SENDGRID_PAYMENT_CAPTURED_ID
//       );
//       // First try using Medusa's notification module for customer email
//       try {
//         await notificationModuleService.createNotifications({
//           to: order.email,
//           channel: "email",
//           template: process.env.SENDGRID_PAYMENT_CAPTURED_ID,
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
//           templateId: process.env.SENDGRID_PAYMENT_CAPTURED_ID,
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
// Now ONLY listen for payment.captured events - the event-bridge will convert LinkOrderCart events
async function paymentCapturedHandler({ event: { data }, container, }) {
    var _a;
    const notificationModuleService = container.resolve(utils_1.Modules.NOTIFICATION);
    const remoteQuery = container.resolve(utils_1.ContainerRegistrationKeys.REMOTE_QUERY);
    // Guard missing payment id
    if (!(data === null || data === void 0 ? void 0 : data.id)) {
        console.error("payment.captured subscriber: missing payment id in event data");
        return;
    }
    // Dedupe by payment id
    const paymentId = data.id;
    if (processedPaymentIds.has(paymentId)) {
        console.log(`payment.captured subscriber: already processed ${paymentId}, skipping`);
        return;
    }
    processedPaymentIds.add(paymentId);
    setTimeout(() => processedPaymentIds.delete(paymentId), 60000);
    const templateId = process.env.SENDGRID_PAYMENT_CAPTURED_ID;
    if (!templateId) {
        console.error("payment.captured subscriber: SENDGRID_PAYMENT_CAPTURED_ID is not set");
        return;
    }
    // 1) Load the payment to obtain payment_collection_id and/or order_id
    const paymentQuery = (0, utils_1.remoteQueryObjectFromString)({
        entryPoint: "payment",
        variables: {
            filters: { id: paymentId },
        },
        fields: [
            "id",
            "amount",
            "currency_code",
            "order_id",
            "captured_at",
            "payment_collection_id",
        ],
    });
    const [payment] = await remoteQuery(paymentQuery);
    if (!payment) {
        console.error("payment.captured subscriber: payment not found", paymentId);
        return;
    }
    // 2) Resolve the order: prefer payment_collection → order, fallback to order_id
    let order = null;
    if (payment.payment_collection_id) {
        const paymentCollectionQuery = (0, utils_1.remoteQueryObjectFromString)({
            entryPoint: "payment_collection",
            variables: { filters: { id: payment.payment_collection_id } },
            fields: ["id", "order_id", "order.*", "order.items.*"],
        });
        const [paymentCollection] = await remoteQuery(paymentCollectionQuery);
        order = (paymentCollection === null || paymentCollection === void 0 ? void 0 : paymentCollection.order) || null;
        if (!order && (paymentCollection === null || paymentCollection === void 0 ? void 0 : paymentCollection.order_id)) {
            const orderQuery = (0, utils_1.remoteQueryObjectFromString)({
                entryPoint: "order",
                variables: { filters: { id: paymentCollection.order_id } },
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
                    "summary.*",
                ],
            });
            const [queriedOrder] = await remoteQuery(orderQuery);
            order = queriedOrder || null;
        }
    }
    else if (payment.order_id) {
        const orderQuery = (0, utils_1.remoteQueryObjectFromString)({
            entryPoint: "order",
            variables: { filters: { id: payment.order_id } },
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
                "summary.*",
            ],
        });
        const [queriedOrder] = await remoteQuery(orderQuery);
        order = queriedOrder || null;
    }
    if (!order) {
        console.error("payment.captured subscriber: could not resolve order for payment", paymentId);
        return;
    }
    const customerEmail = ((_a = order.customer) === null || _a === void 0 ? void 0 : _a.email) || order.email;
    if (!customerEmail) {
        console.error("payment.captured subscriber: order has no customer email", order.id);
        return;
    }
    // Shape data for the SendGrid dynamic template, avoiding hardcoded pricing
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
                    value: payment.amount,
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
}
exports.config = {
    event: "payment.captured",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1jYXB0dXJlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9wYXltZW50LWNhcHR1cmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1REFBdUQ7QUFDdkQsMEVBQTBFO0FBQzFFLHVFQUF1RTtBQUN2RSw2RUFBNkU7QUFDN0UsNkJBQTZCO0FBQzdCLDhCQUE4QjtBQUM5Qix1Q0FBdUM7OztBQTJXdkMseUNBMEpDO0FBbGdCRCxxREFJbUM7QUFFbkMsdUZBQXVGO0FBQ3ZGLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztBQUU5QyxtQ0FBbUM7QUFDbkMsOEJBQThCO0FBQzlCLDJFQUEyRTtBQUMzRSx5QkFBeUI7QUFDekIsb0RBQW9EO0FBRXBELHlCQUF5QjtBQUN6QixzQ0FBc0M7QUFDdEMsb0RBQW9EO0FBQ3BELCtEQUErRDtBQUMvRCxXQUFXO0FBQ1gsd0VBQXdFO0FBQ3hFLElBQUk7QUFFSiwyQ0FBMkM7QUFDM0Msa0ZBQWtGO0FBQ2xGLGdEQUFnRDtBQUNoRCxxQkFBcUI7QUFDckIsdUVBQXVFO0FBRXZFLHlEQUF5RDtBQUN6RCxZQUFZO0FBQ1oscUJBQXFCO0FBQ3JCLHlHQUF5RztBQUN6RyxXQUFXO0FBQ1gsaUZBQWlGO0FBQ2pGLHFCQUFxQjtBQUNyQixxREFBcUQ7QUFDckQsYUFBYTtBQUNiLFlBQVk7QUFDWixxQkFBcUI7QUFDckIsMEVBQTBFO0FBQzFFLFdBQVc7QUFDWCxvQ0FBb0M7QUFDcEMsMkJBQTJCO0FBQzNCLHVCQUF1QjtBQUN2QixrRkFBa0Y7QUFDbEYsMkJBQTJCO0FBQzNCLFdBQVc7QUFFWCxnRUFBZ0U7QUFDaEUsaUNBQWlDO0FBQ2pDLGdCQUFnQjtBQUNoQix5QkFBeUI7QUFDekIsK0VBQStFO0FBQy9FLGVBQWU7QUFDZiw4Q0FBOEM7QUFDOUMsb0RBQW9EO0FBQ3BELGdCQUFnQjtBQUNoQiwyQkFBMkI7QUFDM0IscURBQXFEO0FBQ3JELG1CQUFtQjtBQUNuQixnQkFBZ0I7QUFDaEIsZUFBZTtBQUNmLHlCQUF5QjtBQUN6Qiw4RUFBOEU7QUFDOUUsZUFBZTtBQUNmLHdDQUF3QztBQUN4QywrQkFBK0I7QUFDL0IsMkJBQTJCO0FBQzNCLHdEQUF3RDtBQUN4RCwrQkFBK0I7QUFDL0IsZUFBZTtBQUNmLHdEQUF3RDtBQUN4RCxZQUFZO0FBQ1osVUFBVTtBQUVWLGdDQUFnQztBQUNoQyxxQkFBcUI7QUFDckIsMkVBQTJFO0FBQzNFLFdBQVc7QUFDWCxvRUFBb0U7QUFDcEUsUUFBUTtBQUNSLE1BQU07QUFDTixJQUFJO0FBRUoscURBQXFEO0FBQ3JELFdBQVc7QUFDWCxlQUFlO0FBQ2YsNEJBQTRCO0FBQzVCLFVBQVU7QUFDVix1RUFBdUU7QUFFdkUsaUhBQWlIO0FBQ2pILCtDQUErQztBQUMvQyx1RUFBdUU7QUFDdkUsZ0JBQWdCO0FBQ2hCLFFBQVE7QUFFUixxQ0FBcUM7QUFDckMsOEJBQThCO0FBQzlCLG1CQUFtQjtBQUNuQixxREFBcUQ7QUFDckQsNENBQTRDO0FBQzVDLFNBQVM7QUFFVCwrQkFBK0I7QUFDL0IscUVBQXFFO0FBQ3JFLGdCQUFnQjtBQUNoQixRQUFRO0FBRVIsOENBQThDO0FBQzlDLGlGQUFpRjtBQUNqRiwwRUFBMEU7QUFFMUUsZ0VBQWdFO0FBQ2hFLCtCQUErQjtBQUUvQix1Q0FBdUM7QUFDdkMsaUJBQWlCO0FBQ2pCLFlBQVk7QUFDWiw2REFBNkQ7QUFDN0Qsc0JBQXNCO0FBQ3RCLHVCQUF1QjtBQUN2QiwyRUFBMkU7QUFDM0Usc0JBQXNCO0FBQ3RCLFdBQVc7QUFFWCx3RUFBd0U7QUFDeEUsd0NBQXdDO0FBQ3hDLHVCQUF1QjtBQUN2Qiw0RUFBNEU7QUFDNUUsYUFBYTtBQUNiLHdCQUF3QjtBQUN4Qix1REFBdUQ7QUFDdkQsdUJBQXVCO0FBQ3ZCLGlGQUFpRjtBQUNqRixhQUFhO0FBQ2IscUNBQXFDO0FBQ3JDLGlCQUFpQjtBQUNqQiwrRkFBK0Y7QUFDL0YsdUJBQXVCO0FBQ3ZCLGtGQUFrRjtBQUNsRixhQUFhO0FBQ2IscUVBQXFFO0FBRXJFLGdCQUFnQjtBQUNoQiwrQ0FBK0M7QUFDL0Msb0VBQW9FO0FBQ3BFLCtCQUErQjtBQUMvQixpRkFBaUY7QUFDakYseUJBQXlCO0FBQ3pCLDRFQUE0RTtBQUM1RSxlQUFlO0FBQ2Ysc0JBQXNCO0FBQ3RCLDJCQUEyQjtBQUMzQiwyR0FBMkc7QUFDM0csZ0VBQWdFO0FBQ2hFLGVBQWU7QUFDZixZQUFZO0FBQ1osVUFBVTtBQUNWLFFBQVE7QUFFUixvQkFBb0I7QUFDcEIsdUJBQXVCO0FBQ3ZCLDJFQUEyRTtBQUMzRSxXQUFXO0FBQ1gsZ0JBQWdCO0FBQ2hCLFFBQVE7QUFFUiw2REFBNkQ7QUFDN0QsNkNBQTZDO0FBQzdDLHVCQUF1QjtBQUN2QixrRkFBa0Y7QUFDbEYsV0FBVztBQUVYLGdFQUFnRTtBQUNoRSxjQUFjO0FBQ2Qsd0JBQXdCO0FBQ3hCLDZCQUE2QjtBQUM3Qiw2RUFBNkU7QUFDN0UscURBQXFEO0FBQ3JELDJDQUEyQztBQUMzQyxnQkFBZ0I7QUFDaEIscUlBQXFJO0FBQ3JJLGFBQWE7QUFFYiw4Q0FBOEM7QUFDOUMsb0NBQW9DO0FBQ3BDLHNFQUFzRTtBQUN0RSxZQUFZO0FBQ1osNkJBQTZCO0FBQzdCLG9FQUFvRTtBQUNwRSxVQUFVO0FBRVYsZ0JBQWdCO0FBQ2hCLFFBQVE7QUFFUixtQkFBbUI7QUFDbkIsNERBQTREO0FBQzVELDhCQUE4QjtBQUM5Qix5Q0FBeUM7QUFDekMsa0NBQWtDO0FBQ2xDLFNBQVM7QUFFVCxxQ0FBcUM7QUFDckMsNERBQTREO0FBRTVELGlEQUFpRDtBQUNqRCxvRUFBb0U7QUFDcEUsa0NBQWtDO0FBQ2xDLG9DQUFvQztBQUNwQyw4Q0FBOEM7QUFDOUMsOENBQThDO0FBQzlDLDRCQUE0QjtBQUM1QixVQUFVO0FBRVYsMkNBQTJDO0FBQzNDLDREQUE0RDtBQUU1RCxvQ0FBb0M7QUFDcEMscUVBQXFFO0FBQ3JFLDJDQUEyQztBQUMzQyw2Q0FBNkM7QUFDN0MsdURBQXVEO0FBQ3ZELHVEQUF1RDtBQUN2RCxxQ0FBcUM7QUFDckMsVUFBVTtBQUVWLCtDQUErQztBQUMvQywwQkFBMEI7QUFDMUIsOEVBQThFO0FBQzlFLGdCQUFnQjtBQUNoQixRQUFRO0FBRVIsWUFBWTtBQUNaLDZFQUE2RTtBQUM3RSxxQkFBcUI7QUFDckIsc0RBQXNEO0FBQ3RELG1EQUFtRDtBQUNuRCxXQUFXO0FBRVgsMkVBQTJFO0FBQzNFLGNBQWM7QUFDZCxnRUFBZ0U7QUFDaEUsNkJBQTZCO0FBQzdCLDhCQUE4QjtBQUM5QixnRUFBZ0U7QUFDaEUsb0JBQW9CO0FBQ3BCLDhCQUE4QjtBQUM5QixpRkFBaUY7QUFDakYsdURBQXVEO0FBQ3ZELHVEQUF1RDtBQUN2RCxpQkFBaUI7QUFDakIscUNBQXFDO0FBQ3JDLCtCQUErQjtBQUMvQixvREFBb0Q7QUFDcEQsZUFBZTtBQUNmLGNBQWM7QUFDZCx1QkFBdUI7QUFDdkIsMEZBQTBGO0FBQzFGLGFBQWE7QUFDYixnQ0FBZ0M7QUFDaEMseUJBQXlCO0FBQ3pCLHFFQUFxRTtBQUNyRSx3QkFBd0I7QUFDeEIsYUFBYTtBQUViLCtFQUErRTtBQUMvRSx1QkFBdUI7QUFDdkIsMkVBQTJFO0FBQzNFLGFBQWE7QUFFYiw4REFBOEQ7QUFDOUQsd0JBQXdCO0FBQ3hCLDZCQUE2QjtBQUM3Qiw2RUFBNkU7QUFDN0Usa0VBQWtFO0FBQ2xFLG1DQUFtQztBQUNuQyxxQ0FBcUM7QUFDckMsK0JBQStCO0FBQy9CLG9EQUFvRDtBQUNwRCxlQUFlO0FBQ2YsYUFBYTtBQUViLDBCQUEwQjtBQUMxQix1QkFBdUI7QUFDdkIsbUZBQW1GO0FBQ25GLGFBQWE7QUFDYixVQUFVO0FBQ1Ysd0JBQXdCO0FBQ3hCLHVCQUF1QjtBQUN2QixxRUFBcUU7QUFDckUsZ0JBQWdCO0FBQ2hCLFdBQVc7QUFFWCwwQ0FBMEM7QUFDMUMsc0NBQXNDO0FBQ3RDLGlFQUFpRTtBQUNqRSw4QkFBOEI7QUFDOUIsb0NBQW9DO0FBQ3BDLGdDQUFnQztBQUNoQyxjQUFjO0FBQ2QsVUFBVTtBQUNWLFFBQVE7QUFDUixzQkFBc0I7QUFDdEIscUVBQXFFO0FBQ3JFLE1BQU07QUFDTixJQUFJO0FBRUosTUFBTTtBQUNOLGtFQUFrRTtBQUNsRSxNQUFNO0FBQ04sZ0NBQWdDO0FBQ2hDLGlEQUFpRDtBQUNqRCxxQkFBcUI7QUFDckIsTUFBTTtBQUVOLDZDQUE2QztBQUM3Qyw0RUFBNEU7QUFFNUUsOERBQThEO0FBQzlELDBGQUEwRjtBQUMxRixnREFBZ0Q7QUFDaEQsc0ZBQXNGO0FBQ3RGLGtDQUFrQztBQUNsQyxhQUFhO0FBQ2IsNkRBQTZEO0FBQzdELDBDQUEwQztBQUMxQyxNQUFNO0FBQ04sSUFBSTtBQUVKLE1BQU07QUFDTixvREFBb0Q7QUFDcEQsTUFBTTtBQUNOLDJDQUEyQztBQUMzQyw4QkFBOEI7QUFDOUIsdUNBQXVDO0FBQ3ZDLHFDQUFxQztBQUNyQyxtQkFBbUI7QUFDbkIsb0RBQW9EO0FBQ3BELDBEQUEwRDtBQUMxRCx1Q0FBdUM7QUFDdkMsWUFBWTtBQUNaLFlBQVk7QUFFWix5Q0FBeUM7QUFDekMsYUFBYTtBQUNiLGdCQUFnQjtBQUNoQixnREFBZ0Q7QUFDaEQsdUNBQXVDO0FBQ3ZDLDZDQUE2QztBQUM3QywrQ0FBK0M7QUFDL0MseURBQXlEO0FBQ3pELDhEQUE4RDtBQUM5RCw2QkFBNkI7QUFDN0IsT0FBTztBQUNQLElBQUk7QUFFSixtR0FBbUc7QUFFcEYsS0FBSyxVQUFVLHNCQUFzQixDQUFDLEVBQ25ELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUNmLFNBQVMsR0FDc0I7O0lBQy9CLE1BQU0seUJBQXlCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUUsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUU5RSwyQkFBMkI7SUFDM0IsSUFBSSxDQUFDLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEVBQUUsQ0FBQSxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7UUFDL0UsT0FBTztJQUNULENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQVksQ0FBQztJQUNwQyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0RBQWtELFNBQVMsWUFBWSxDQUFDLENBQUM7UUFDckYsT0FBTztJQUNULENBQUM7SUFDRCxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFNLENBQUMsQ0FBQztJQUVoRSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO0lBQzVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLHNFQUFzRSxDQUFDLENBQUM7UUFDdEYsT0FBTztJQUNULENBQUM7SUFFRCxzRUFBc0U7SUFDdEUsTUFBTSxZQUFZLEdBQUcsSUFBQSxtQ0FBMkIsRUFBQztRQUMvQyxVQUFVLEVBQUUsU0FBUztRQUNyQixTQUFTLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFO1NBQzNCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSTtZQUNKLFFBQVE7WUFDUixlQUFlO1lBQ2YsVUFBVTtZQUNWLGFBQWE7WUFDYix1QkFBdUI7U0FDeEI7S0FDRixDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRSxPQUFPO0lBQ1QsQ0FBQztJQUVELGdGQUFnRjtJQUNoRixJQUFJLEtBQUssR0FBZSxJQUFJLENBQUM7SUFFN0IsSUFBSSxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNsQyxNQUFNLHNCQUFzQixHQUFHLElBQUEsbUNBQTJCLEVBQUM7WUFDekQsVUFBVSxFQUFFLG9CQUFvQjtZQUNoQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixFQUFFLEVBQUU7WUFDN0QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDO1NBQ3ZELENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLE1BQU0sV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEUsS0FBSyxHQUFHLENBQUEsaUJBQWlCLGFBQWpCLGlCQUFpQix1QkFBakIsaUJBQWlCLENBQUUsS0FBSyxLQUFJLElBQUksQ0FBQztRQUV6QyxJQUFJLENBQUMsS0FBSyxLQUFJLGlCQUFpQixhQUFqQixpQkFBaUIsdUJBQWpCLGlCQUFpQixDQUFFLFFBQVEsQ0FBQSxFQUFFLENBQUM7WUFDMUMsTUFBTSxVQUFVLEdBQUcsSUFBQSxtQ0FBMkIsRUFBQztnQkFDN0MsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDMUQsTUFBTSxFQUFFO29CQUNOLElBQUk7b0JBQ0osWUFBWTtvQkFDWixPQUFPO29CQUNQLGVBQWU7b0JBQ2YsT0FBTztvQkFDUCxVQUFVO29CQUNWLGdCQUFnQjtvQkFDaEIsV0FBVztvQkFDWCxnQkFBZ0I7b0JBQ2hCLFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQixtQkFBbUI7b0JBQ25CLFNBQVM7b0JBQ1QsV0FBVztpQkFDWjthQUNGLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyRCxLQUFLLEdBQUcsWUFBWSxJQUFJLElBQUksQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztTQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLE1BQU0sVUFBVSxHQUFHLElBQUEsbUNBQTJCLEVBQUM7WUFDN0MsVUFBVSxFQUFFLE9BQU87WUFDbkIsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNoRCxNQUFNLEVBQUU7Z0JBQ04sSUFBSTtnQkFDSixZQUFZO2dCQUNaLE9BQU87Z0JBQ1AsZUFBZTtnQkFDZixPQUFPO2dCQUNQLFVBQVU7Z0JBQ1YsZ0JBQWdCO2dCQUNoQixXQUFXO2dCQUNYLGdCQUFnQjtnQkFDaEIsWUFBWTtnQkFDWixvQkFBb0I7Z0JBQ3BCLG1CQUFtQjtnQkFDbkIsU0FBUztnQkFDVCxXQUFXO2FBQ1o7U0FDRixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsTUFBTSxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsS0FBSyxHQUFHLFlBQVksSUFBSSxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLE9BQU8sQ0FBQyxLQUFLLENBQ1gsa0VBQWtFLEVBQ2xFLFNBQVMsQ0FDVixDQUFDO1FBQ0YsT0FBTztJQUNULENBQUM7SUFFRCxNQUFNLGFBQWEsR0FBdUIsQ0FBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLDBDQUFFLEtBQUssS0FBSSxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQy9FLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQixPQUFPLENBQUMsS0FBSyxDQUNYLDBEQUEwRCxFQUMxRCxLQUFLLENBQUMsRUFBRSxDQUNULENBQUM7UUFDRixPQUFPO0lBQ1QsQ0FBQztJQUVELDJFQUEyRTtJQUMzRSxNQUFNLFNBQVMsR0FBRztRQUNoQixZQUFZLEVBQUU7WUFDWixPQUFPLEVBQUUsNkJBQTZCLEtBQUssQ0FBQyxVQUFVLEVBQUU7U0FDekQ7UUFDRCxLQUFLLEVBQUU7WUFDTCxHQUFHLEtBQUs7WUFDUixRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLGFBQWE7YUFDckI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsdUJBQXVCLEVBQUU7b0JBQ3ZCLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTTtpQkFDdEI7YUFDRjtTQUNGO1FBQ0QsZUFBZSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTO1FBQ3BELE9BQU8sRUFBRSxpQ0FBaUM7UUFDMUMsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO0tBQzdCLENBQUM7SUFFWCxNQUFNLHlCQUF5QixDQUFDLG1CQUFtQixDQUFDO1FBQ2xELEVBQUUsRUFBRSxhQUFhO1FBQ2pCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLElBQUksRUFBRSxTQUFTO0tBQ2hCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLGtCQUFrQjtDQUMxQixDQUFDIn0=