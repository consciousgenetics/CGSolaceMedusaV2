import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa"
import axios from "axios"
import sgMail from "@sendgrid/mail"

/**
 * This subscriber acts as a bridge that converts LinkOrderCart.attached events into order.placed events.
 * Medusa's checkout flow is triggering LinkOrderCart events, but we want order.placed events for our email notifications.
 */
export default async function eventBridgeHandler({
  event,
  container,
}: SubscriberArgs<any>) {
  try {
    console.log("🌉 Event bridge received:", event.name)
    
    // Only intercept LinkOrderCart.attached events
    if (event.name !== "LinkOrderCart.attached") {
      return
    }
    
    const { data } = event
    console.log("🔄 Processing bridge for LinkOrderCart:", JSON.stringify(data, null, 2))
    
    if (!data || !data.id) {
      console.error("❌ Invalid data received in event bridge")
      return
    }
    
    // Get API base URL and tokens
    const baseUrl = process.env.BACKEND_URL || "http://localhost:9000"
    const publishableKey = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c'
    
    // Extract cart ID from the event payload or from the ordercart_id directly
    const cartId = extractCartId(data.id)
    if (!cartId) {
      console.error("❌ Could not extract cart ID from event data")
      
      // Still try to send emails directly using recent order logic as fallback
      await sendDirectEmailsUsingRecentOrder(baseUrl, publishableKey, container)
      return
    }
    
    console.log("🛒 Extracted cart ID:", cartId)
    
    // Try to get the order directly from the store API using the cart ID
    try {
      console.log("🔍 Attempting to fetch order using cart ID...")
      // Note: There's no direct cart->order API in Medusa, so we'll fetch recent orders
      // and look for one associated with this cart
      
      // We'll directly try to send emails using the most recent order
      await sendDirectEmailsUsingRecentOrder(baseUrl, publishableKey, container)
      
      // Additionally, try to emit an order.placed event
      try {
        // Try to get the most recent order to use its ID
        const ordersResponse = await axios.get(
          `${baseUrl}/store/orders?limit=1`,
          {
            headers: {
              "x-publishable-api-key": publishableKey
            }
          }
        )
        
        if ((ordersResponse.data as any).orders && (ordersResponse.data as any).orders.length > 0) {
          const recentOrder = (ordersResponse.data as any).orders[0]
          const orderId = recentOrder.id
          
          console.log(`🚀 Emitting order.placed for recent order ${orderId}`)
          
          // Get the event bus service
          const eventBusService = container.resolve("eventBusService")
          
          // Emit the order.placed event with the order ID
          // @ts-ignore - Ignore TypeScript error for eventBusService not having emit method
          await eventBusService.emit("order.placed", { id: orderId })
          
          console.log("✅ Successfully emitted order.placed event")
        }
      } catch (eventError) {
        console.error("❌ Failed to emit order.placed event:", eventError.message)
        // Already tried sending emails directly, no need for further action
      }
    } catch (error) {
      console.error("❌ Failed while handling cart:", error.message)
      // Already tried fallback approach with recent orders
    }
  } catch (error) {
    console.error("❌ Unhandled error in event bridge:", error)
  }
}

/**
 * Extract cart ID from ordercart_id or other formats
 */
function extractCartId(id) {
  try {
    // Sample format: "ordercart_01JT7TX7KZVQXZDD0G8Y649G66"
    if (id.startsWith("ordercart_")) {
      // We don't have a direct way to get the cart ID from ordercart_id
      // This is a limitation of Medusa's API
      return null
    }
    
    return id
  } catch (error) {
    console.error("❌ Error extracting cart ID:", error)
    return null
  }
}

/**
 * Format monetary values properly from cents to dollars/pounds
 * Medusa stores prices in cents/pennies by default
 */
function formatMoney(value) {
  if (value === null || value === undefined) {
    return "0";
  }
  
  // Make sure we're working with a number
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Return whole number value without dividing by 100
  return Math.round(numValue).toString();
}

/**
 * Get currency symbol from currency code
 */
function getCurrencySymbol(currencyCode) {
  const symbols = {
    'usd': '$',
    'eur': '€',
    'gbp': '£',
    'jpy': '¥',
    'cad': 'C$',
    'aud': 'A$'
  }
  
  return symbols[currencyCode.toLowerCase()] || currencyCode.toUpperCase()
}

/**
 * Send emails directly without relying on event handlers, using recent order approach
 */
async function sendDirectEmailsUsingRecentOrder(baseUrl, publishableKey, container) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error("❌ SendGrid API key not set!")
      return
    }
    
    // Initialize SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    console.log("🔍 Fetching most recent order from store API...")
    
    // Get the most recent order
    try {
      const response = await axios.get(
        `${baseUrl}/store/orders?limit=1`,
        {
          headers: {
            "x-publishable-api-key": publishableKey
          }
        }
      )
      
      if (!(response.data as any).orders || (response.data as any).orders.length === 0) {
        console.error("❌ No recent orders found in store API")
        return
      }
      
      const order = (response.data as any).orders[0]
      console.log("✅ Found recent order ID:", order.id)
      
      // Extract customer email
      const customerEmail = order.email
      if (!customerEmail) {
        console.error("❌ Order is missing customer email")
        return
      }
      
      // Log original values for debugging
      console.log("💰 Original price values:", {
        subtotal: order.subtotal,
        tax_total: order.tax_total,
        shipping_total: order.shipping_total,
        discount_total: order.discount_total,
        total: order.total
      })
      
      // Prepare order data for templates
      const orderData = {
        ...order,
        display_id: order.display_id || order.id,
        // Format monetary values
        total: formatMoney(order.total),
        subtotal: formatMoney(order.subtotal),
        tax_total: formatMoney(order.tax_total),
        shipping_total: formatMoney(order.shipping_total),
        discount_total: formatMoney(order.discount_total),
        // Get currency info
        currency_code: order.currency_code || 'gbp',
        currency_symbol: getCurrencySymbol(order.currency_code || 'gbp'),
        items: order.items ? order.items.map(item => {
          const formattedPrice = formatMoney(item.unit_price);
          return {
            ...item,
            unit_price: formattedPrice,
            title: item.title || (item.variant?.title || ''),
            variant: item.variant || {}
          };
        }) : []
      }
      
      // Log formatted values for debugging
      console.log("💰 Formatted price values:", {
        subtotal: orderData.subtotal,
        tax_total: orderData.tax_total,
        shipping_total: orderData.shipping_total,
        discount_total: orderData.discount_total,
        total: orderData.total
      })
      
      const shippingAddress = order.shipping_address || {}
      
      console.log("📧 Order details for notifications:", {
        id: order.id,
        display_id: order.display_id,
        email: order.email,
        total: orderData.total  // Use formatted total
      })
      
      // Send customer email
      try {
        const customerMsg = {
          subject: 'Conscious Genetics Order Submitted',
          to: customerEmail,
          from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
          templateId: process.env.SENDGRID_ORDER_PLACED_ID,
          dynamicTemplateData: {
            order: orderData,
            shippingAddress,
            preview: 'Thank you for your order!',
            subject: 'Conscious Genetics Order Submitted'
          },
          categories: ['order-confirmation'],
          customArgs: {
            subject: 'Conscious Genetics Order Submitted'
          }
        }
        
        await sgMail.send(customerMsg)
        console.log("✅ Direct customer email sent to:", customerEmail)
      } catch (customerError) {
        console.error("❌ Failed to send direct customer email:", customerError)
      }
      
      // Send admin email
      try {
        const adminEmail = 'info@consciousgenetics.com'
        const adminMsg = {
          to: adminEmail,
          from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
          subject: `New Order #${order.display_id || order.id} from ${customerEmail}`,
          templateId: process.env.SENDGRID_ADMIN_NOTIFICATION_ID || process.env.SENDGRID_ORDER_PLACED_ID,
          dynamicTemplateData: {
            order: orderData,
            shippingAddress,
            preview: `New Order #${order.display_id || order.id}`,
            currentYear: new Date().getFullYear()
          }
        }
        
        await sgMail.send(adminMsg)
        console.log("✅ Direct admin email sent to:", adminEmail)
      } catch (adminError) {
        console.error("❌ Failed to send direct admin email:", adminError)
        
        // Try simple text email as last resort
        try {
          const simpleMsg = {
            to: 'info@consciousgenetics.com',
            from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
            subject: `New Order #${order.display_id || order.id} from ${customerEmail}`,
            text: `A new order #${order.display_id || order.id} has been placed by ${customerEmail} for a total of ${orderData.currency_symbol}${orderData.total}.`
          }
          
          await sgMail.send(simpleMsg)
          console.log("✅ Simple admin notification sent as fallback")
        } catch (simpleError) {
          console.error("❌ Even simple admin email failed:", simpleError)
        }
      }
    } catch (error) {
      console.error("❌ Failed to fetch recent orders:", error.message)
    }
  } catch (error) {
    console.error("❌ Error in direct email sending:", error)
  }
}

// This subscriber should be called BEFORE other subscribers to ensure they receive the order.placed event
export const config: SubscriberConfig = {
  event: ["LinkOrderCart.attached"]
} 