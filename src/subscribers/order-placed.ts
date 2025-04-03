import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'
import { EmailTemplates } from '../modules/email-notifications/templates'
import axios from 'axios'

// The known publishable API key
const PUBLISHABLE_API_KEY = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c'

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  try {
    console.log('Order placed handler started with data:', JSON.stringify(data || {}, null, 2))
    
    if (!data || !data.id) {
      console.error('Invalid order data received in order-placed handler')
      return
    }
    
    // Use the notification module directly
    const notificationModuleService = container.resolve(Modules.NOTIFICATION)
    
    // Fetch order data from the store API with the known publishable API key
    let order
    try {
      const baseUrl = process.env.BACKEND_URL || 'http://localhost:9000'
      
      // Use the store API with the provided publishable key
      try {
        const response = await axios.get(
          `${baseUrl}/store/orders/${data.id}`, 
          {
            headers: {
              'x-publishable-api-key': PUBLISHABLE_API_KEY
            }
          }
        )
        order = response.data.order
        console.log('Order fetched successfully via store API')
      } catch (storeErr) {
        console.error('Store API failed:', storeErr.message)
        
        // If store API still fails, try admin API as fallback
        console.log('Falling back to admin API...')
        const apiToken = process.env.MEDUSA_ADMIN_API_TOKEN || process.env.COOKIE_SECRET
        const response = await axios.get(
          `${baseUrl}/admin/orders/${data.id}`,
          {
            headers: {
              'x-medusa-access-token': apiToken
            }
          }
        )
        order = response.data.order
        console.log('Order fetched successfully via admin API')
      }
    } catch (err) {
      console.error('Error fetching order via API:', err.message)
      
      // Last resort - use the order data from the event if available
      if (data.email && data.items) {
        console.log('Using order data from event as fallback')
        order = data
      } else {
        return
      }
    }
    
    if (!order) {
      console.error('Order not found or could not be retrieved')
      return
    }
    
    console.log("Order retrieved successfully, analyzing structure:", 
      `ID: ${order.id}, ` +
      `Has items: ${!!(order.items && order.items.length)}, ` +
      `Item count: ${order.items?.length || 0}, ` +
      `Has shipping address: ${!!order.shipping_address}, ` +
      `Email: ${order.email}`)
    
    // Use the order data directly
    const shippingAddress = order.shipping_address || {}
    
    console.log('ORDER VALUES FROM API:', {
      subtotal: order.subtotal,
      tax_total: order.tax_total,
      shipping_total: order.shipping_total,
      discount_total: order.discount_total,
      total: order.total
    })
    
    // Create enriched order object using original values
    const enrichedOrder = {
      ...order
    }
  
    // Only proceed if we have a valid email
    if (!order.email) {
      console.error('Order is missing email address')
      return
    }
    
    try {
      await notificationModuleService.createNotifications({
        to: order.email,
        channel: 'email',
        template: process.env.SENDGRID_ORDER_PLACED_ID,
        data: {
          emailOptions: {
            from: process.env.SENDGRID_FROM,
            replyTo: 'info@example.com',
            subject: 'Your order has been placed'
          },
          order: enrichedOrder,
          shippingAddress,
          preview: 'Thank you for your order!'
        }
      })
      console.log('Order confirmation email sent successfully')
    } catch (error) {
      console.error('Error sending order confirmation notification:', error)
    }
  } catch (error) {
    console.error('Unhandled error in order-placed handler:', error)
  }
}

export const config: SubscriberConfig = {
  event: 'order.placed'
}