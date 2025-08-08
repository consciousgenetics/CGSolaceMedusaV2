"use strict";
// import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa"
// import axios from "axios"
// import sgMail from "@sendgrid/mail"
Object.defineProperty(exports, "__esModule", { value: true });
// // Constants
// const PUBLISHABLE_API_KEY = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c'
// const ADMIN_EMAIL = 'info@consciousgenetics.com'
// // Initialize SendGrid
// if (process.env.SENDGRID_API_KEY) {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//   console.log('💌 Admin notifier: SendGrid initialized')
// } else {
//   console.error('❌ Admin notifier: SENDGRID_API_KEY is not set!')
// }
// /**
//  * This subscriber handles sending order notifications to the admin email
//  * It's separate from the customer notification to ensure reliability
//  */
// export default async function adminOrderNotificationHandler({
//   event,
//   container,
// }: SubscriberArgs<any>) {
//   try {
//     console.log("👨‍💼 Admin notifier received event:", event.name)
//     // Accept the same events as the order-placed subscriber
//     const validEvents = ['order.placed', 'LinkOrderCart.attached']
//     if (!validEvents.includes(event.name)) {
//       console.log(`Admin notifier ignoring event ${event.name}`)
//       return
//     }
//     // Extract data from the event
//     const { data } = event
//     console.log("Admin notifier processing event data:", JSON.stringify(data || {}, null, 2))
//     if (!data || !data.id) {
//       console.error("❌ Admin notifier: Invalid data received")
//       return
//     }
//     // Get the order ID based on event type
//     let orderId = data.id
//     const baseUrl = process.env.BACKEND_URL || "http://localhost:9000"
//     // For LinkOrderCart.attached events, we need to get the most recent order
//     if (event.name === 'LinkOrderCart.attached') {
//       try {
//         console.log("🔍 Admin notifier: Fetching most recent order...")
//         const response = await axios.get(
//           `${baseUrl}/store/orders?limit=1`,
//           {
//             headers: {
//               "x-publishable-api-key": PUBLISHABLE_API_KEY
//             }
//           }
//         )
//         if ((response.data as any).orders && (response.data as any).orders.length > 0) {
//           orderId = (response.data as any).orders[0].id
//           console.log("✅ Admin notifier: Found recent order ID:", orderId)
//         } else {
//           console.error("❌ Admin notifier: No recent orders found")
//           return
//         }
//       } catch (error) {
//         console.error("❌ Admin notifier: Failed to fetch recent orders:", error.message)
//         return
//       }
//     }
//     // Fetch the order details
//     let order
//     try {
//       // For admin notification, always try to get full details from store API
//       console.log("📦 Admin notifier: Fetching order details for:", orderId)
//       const response = await axios.get(
//         `${baseUrl}/store/orders/${orderId}`,
//         {
//           headers: {
//             "x-publishable-api-key": PUBLISHABLE_API_KEY
//           }
//         }
//       )
//       order = (response.data as any).order
//       console.log("✅ Admin notifier: Order details retrieved successfully")
//     } catch (error) {
//       console.error("❌ Admin notifier: Failed to fetch order details:", error.message)
//       return
//     }
//     if (!order) {
//       console.error("❌ Admin notifier: Order not found")
//       return
//     }
//     // Extract necessary information from the order
//     const customerEmail = order.email || 'unknown@email.com'
//     const shippingAddress = order.shipping_address || {}
//     // Log original price values
//     console.log("💰 Admin notifier: Original price values:", {
//       total: order.total,
//       subtotal: order.subtotal,
//       tax_total: order.tax_total,
//       shipping_total: order.shipping_total
//     })
//     // Format the order for the template
//     const formattedOrder = formatOrderForTemplate(order)
//     // Log formatted price values
//     console.log("💵 Admin notifier: Formatted price values:", {
//       total: formattedOrder.total,
//       subtotal: formattedOrder.subtotal,
//       tax_total: formattedOrder.tax_total,
//       shipping_total: formattedOrder.shipping_total
//     })
//     // Send the admin notification email
//     try {
//       // Try the template first
//       const templateId = process.env.SENDGRID_ADMIN_NOTIFICATION_ID || process.env.SENDGRID_ORDER_PLACED_ID
//       console.log(`📧 Admin notifier: Sending email to ${ADMIN_EMAIL} with template ${templateId}`)
//       const msg = {
//         to: ADMIN_EMAIL,
//         from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
//         subject: `New Order #${order.display_id || order.id} from ${customerEmail}`,
//         templateId,
//         dynamicTemplateData: {
//           order: formattedOrder,
//           shippingAddress,
//           preview: `New Order #${order.display_id || order.id}`,
//           currentYear: new Date().getFullYear()
//         }
//       }
//       const response = await sgMail.send(msg)
//       console.log("✅ Admin notifier: Email sent successfully, status:", response[0]?.statusCode)
//     } catch (error) {
//       console.error("❌ Admin notifier: Failed to send email with template:", error.message)
//       // If template email fails, try a simpler approach
//       try {
//         console.log("🔄 Admin notifier: Trying simple text email as fallback...")
//         const simpleMsg = {
//           to: ADMIN_EMAIL,
//           from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
//           subject: `New Order #${order.display_id || order.id} from ${customerEmail}`,
//           text: `
//             A new order has been placed:
//             Order #: ${order.display_id || order.id}
//             Customer: ${customerEmail}
//             Date: ${new Date(order.created_at).toLocaleString()}
//             Total: ${formattedOrder.currency_symbol}${formattedOrder.total}
//             Items:
//             ${order.items ? order.items.map(item => 
//               `- ${item.title} (${item.quantity} x ${formattedOrder.currency_symbol}${formatMoney(item.unit_price)})`
//             ).join('\n') : 'No items'}
//             Shipping Address:
//             ${shippingAddress.first_name || ''} ${shippingAddress.last_name || ''}
//             ${shippingAddress.address_1 || ''}
//             ${shippingAddress.city || ''}, ${shippingAddress.postal_code || ''}
//             ${shippingAddress.country_code || ''}
//           `
//         }
//         await sgMail.send(simpleMsg)
//         console.log("✅ Admin notifier: Simple email sent successfully")
//       } catch (simpleError) {
//         console.error("❌ Admin notifier: Even simple email failed:", simpleError.message)
//       }
//     }
//   } catch (error) {
//     console.error("❌ Admin notifier: Unhandled error:", error)
//   }
// }
// /**
//  * Format monetary values properly from cents to dollars/pounds
//  */
// function formatMoney(value) {
//   if (value === null || value === undefined) {
//     return "0"
//   }
//   // Make sure we're working with a number
//   const numValue = typeof value === 'string' ? parseFloat(value) : value
//   // Return whole number value without dividing by 100
//   return Math.round(numValue).toString()
// }
// /**
//  * Format the order object for the email template
//  */
// function formatOrderForTemplate(order) {
//   // Format the order items
//   const formattedItems = order.items ? order.items.map(item => ({
//     ...item,
//     unit_price: formatMoney(item.unit_price),
//     title: item.title || (item.variant?.title || ''),
//     variant: item.variant || {}
//   })) : []
//   // Get currency code from order, default to GBP if not present
//   const currency = order.currency_code || 'gbp'
//   // Get currency symbol based on currency code
//   const currencySymbol = getCurrencySymbol(currency)
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
//     // Add currency info to the formatted order
//     currency_code: currency,
//     currency_symbol: currencySymbol
//   }
// }
// /**
//  * Get currency symbol from currency code
//  */
// function getCurrencySymbol(currencyCode) {
//   const symbols = {
//     'usd': '$',
//     'eur': '€',
//     'gbp': '£',
//     'jpy': '¥',
//     'cad': 'C$',
//     'aud': 'A$'
//   }
//   return symbols[currencyCode.toLowerCase()] || currencyCode.toUpperCase()
// }
// // Listen for the same events as the order-placed subscriber
// export const config: SubscriberConfig = {
//   event: ['order.placed', 'LinkOrderCart.attached']
// } 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tb3JkZXItbm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL2FkbWluLW9yZGVyLW5vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0VBQXNFO0FBQ3RFLDRCQUE0QjtBQUM1QixzQ0FBc0M7O0FBRXRDLGVBQWU7QUFDZixvR0FBb0c7QUFDcEcsbURBQW1EO0FBRW5ELHlCQUF5QjtBQUN6QixzQ0FBc0M7QUFDdEMsbURBQW1EO0FBQ25ELDJEQUEyRDtBQUMzRCxXQUFXO0FBQ1gsb0VBQW9FO0FBQ3BFLElBQUk7QUFFSixNQUFNO0FBQ04sNEVBQTRFO0FBQzVFLHdFQUF3RTtBQUN4RSxNQUFNO0FBQ04sZ0VBQWdFO0FBQ2hFLFdBQVc7QUFDWCxlQUFlO0FBQ2YsNEJBQTRCO0FBQzVCLFVBQVU7QUFDVixzRUFBc0U7QUFFdEUsK0RBQStEO0FBQy9ELHFFQUFxRTtBQUVyRSwrQ0FBK0M7QUFDL0MsbUVBQW1FO0FBQ25FLGVBQWU7QUFDZixRQUFRO0FBRVIscUNBQXFDO0FBQ3JDLDZCQUE2QjtBQUM3QixnR0FBZ0c7QUFFaEcsK0JBQStCO0FBQy9CLGlFQUFpRTtBQUNqRSxlQUFlO0FBQ2YsUUFBUTtBQUVSLDhDQUE4QztBQUM5Qyw0QkFBNEI7QUFDNUIseUVBQXlFO0FBRXpFLGlGQUFpRjtBQUNqRixxREFBcUQ7QUFDckQsY0FBYztBQUNkLDBFQUEwRTtBQUMxRSw0Q0FBNEM7QUFDNUMsK0NBQStDO0FBQy9DLGNBQWM7QUFDZCx5QkFBeUI7QUFDekIsNkRBQTZEO0FBQzdELGdCQUFnQjtBQUNoQixjQUFjO0FBQ2QsWUFBWTtBQUVaLDJGQUEyRjtBQUMzRiwwREFBMEQ7QUFDMUQsNkVBQTZFO0FBQzdFLG1CQUFtQjtBQUNuQixzRUFBc0U7QUFDdEUsbUJBQW1CO0FBQ25CLFlBQVk7QUFDWiwwQkFBMEI7QUFDMUIsMkZBQTJGO0FBQzNGLGlCQUFp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