import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'
import { EmailTemplates } from '../modules/email-notifications/templates'
import axios from 'axios'

// The known publishable API key
const PUBLISHABLE_API_KEY = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c'

export default async function orderPlacedHandler({
  event,
  container,
}: SubscriberArgs<any>) {
  try {
    // Check which event was triggered
    if (event.name === 'LinkOrderCart.attached') {
      console.log('Cart attached to order:', event.data)
      
      // This event indicates that a cart has been attached to an order
      // You can add custom logic here if needed
      // The event.data will typically contain link information with both cart_id and order_id
      
      // Optionally log the details
      console.log('LinkOrderCart.attached event handled successfully')
      return
    }
    
    if (event.name === 'LinkOrderPaymentCollection.attached') {
      console.log('Payment collection attached to order:', event.data)
      
      // Use the notification module directly
      const notificationModuleService = container.resolve(Modules.NOTIFICATION)
      
      const linkData = event.data;
      
      // The order_id and payment_collection_id should be present in the link data
      if (linkData.order_id) {
        console.log(`Order ID from link data: ${linkData.order_id}`);
        
        try {
          // For now, just log a message that this event was processed
          console.log('Payment collection successfully attached to order, no email sent at this stage');
          
          // Note: We're not sending an email here to avoid duplication, since
          // the order.placed event will already trigger an email
        } catch (error) {
          console.error('Error processing payment collection attachment:', error);
        }
      } else {
        console.error('No order ID found in link data');
      }
      
      return
    }
    
    // The rest of the function handles the order.placed event
    const { data } = event
    console.log('IMPORTANT - Event name:', event.name)
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
      console.log('Attempting to send order confirmation email to:', order.email);
      console.log('Using template ID:', process.env.SENDGRID_ORDER_PLACED_ID);
      console.log('SendGrid API Key available:', !!process.env.SENDGRID_API_KEY);
      console.log('SendGrid FROM address:', process.env.SENDGRID_FROM);
      
      // Let's inspect the notification module service
      console.log('Notification module service available:', !!notificationModuleService);
      if (notificationModuleService) {
        console.log('Notification module service methods:', 
          Object.getOwnPropertyNames(Object.getPrototypeOf(notificationModuleService)));
      }
      
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
          preview: 'Thank you for your order!',
          uniqueId: `order_${order.id}_${Date.now()}`
        }
      })
      console.log('Order confirmation email sent successfully')
    } catch (error) {
      console.error('Error sending order confirmation notification:', error)
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      
      try {
        console.log('Attempting alternative approach for returning customer');
        
        const uniqueEmail = `${order.email.split('@')[0]}+order${order.id}@${order.email.split('@')[1]}`;
        console.log(`Using alternative email format: ${uniqueEmail}`);
        
        await notificationModuleService.createNotifications({
          to: uniqueEmail,
          channel: 'email',
          template: process.env.SENDGRID_ORDER_PLACED_ID,
          data: {
            emailOptions: {
              from: process.env.SENDGRID_FROM,
              replyTo: 'info@example.com',
              subject: 'Your order has been placed',
            },
            order: enrichedOrder,
            shippingAddress,
            preview: 'Thank you for your order!',
            uniqueId: `order_${order.id}_${Date.now()}_alt`
          }
        })
        console.log('Alternative email sent successfully');
      } catch (altError) {
        console.error('Alternative approach also failed:', altError);
      }
    }
  } catch (error) {
    console.error('Unhandled error in order-placed handler:', error)
  }
}

export const config: SubscriberConfig = {
  event: ['order.placed', 'LinkOrderPaymentCollection.attached', 'LinkOrderCart.attached']
}
