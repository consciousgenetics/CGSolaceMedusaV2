// import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa"
// import axios from "axios"
// import sgMail from "@sendgrid/mail"

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