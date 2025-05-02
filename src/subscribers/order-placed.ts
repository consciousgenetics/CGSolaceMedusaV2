import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'
import { EmailTemplates } from '../modules/email-notifications/templates'
import axios from 'axios'
// Import SendGrid directly
import sgMail from '@sendgrid/mail'

// The known publishable API key
const PUBLISHABLE_API_KEY = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export default async function orderPlacedHandler({
  event,
  container,
}: SubscriberArgs<any>) {
  try {
    console.log('Event received:', event.name);
    
    // Only process order.placed events for email notifications
    // Log other events but return early
    if (event.name !== 'order.placed') {
      console.log(`Ignoring event ${event.name} for email notifications:`, event.data);
      return;
    }
    
    // Extract data from the event
    const { data } = event;
    console.log('Processing order.placed event:', JSON.stringify(data || {}, null, 2))
    
    if (!data || !data.id) {
      console.error('Invalid order data received')
      return
    }
    
    // Use the notification module directly
    const notificationModuleService = container.resolve(Modules.NOTIFICATION)
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:9000'
    const apiToken = process.env.MEDUSA_ADMIN_API_TOKEN || process.env.COOKIE_SECRET
    
    // For order.placed, use the order ID directly
    const orderId = data.id
    
    // Fetch order data
    let order
    try {
      // Use the store API with the provided publishable key
      try {
        console.log('Fetching order via store API:', orderId)
        const response = await axios.get(
          `${baseUrl}/store/orders/${orderId}`, 
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
        
        try {
          console.log('Fetching order via admin API:', orderId)
          const response = await axios.get(
            `${baseUrl}/admin/orders/${orderId}`,
            {
              headers: {
                'x-medusa-access-token': apiToken
              }
            }
          )
          order = response.data.order
          console.log('Order fetched successfully via admin API')
        } catch (adminErr) {
          console.error('Admin API failed:', adminErr.message)
          
          // Last resort - use the order data from the event if available
          if (data.email && data.items) {
            console.log('Using order data from event as fallback')
            order = data
          } else {
            // If both API calls fail and we only have an order ID, create a minimal order object
            console.log('Creating minimal order object from ID')
            order = {
              id: orderId,
              // Create a generic email for testing purposes
              email: `order-${orderId}@example.com`,
              ...data // Include any other data from the event
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching order via API:', err.message)
      return
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
      console.log('Attempting to send email to:', order.email);
      console.log('Using template ID:', process.env.SENDGRID_ORDER_PLACED_ID);
      console.log('SendGrid FROM address:', process.env.SENDGRID_FROM);
      
      // First try using Medusa's notification module
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
        console.log('Order confirmation email sent successfully via Medusa notification module')
      } catch (medusaError) {
        console.error('Error sending via Medusa notification module:', medusaError);
        
        // If Medusa's notification fails, try sending directly via SendGrid
        console.log('Falling back to direct SendGrid API...');
        
        // Use SendGrid directly as a fallback
        const msg = {
          to: order.email,
          from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
          templateId: process.env.SENDGRID_ORDER_PLACED_ID,
          dynamicTemplateData: {
            order: enrichedOrder,
            shippingAddress,
            preview: 'Thank you for your order!'
          }
        };
        
        await sgMail.send(msg);
        console.log('Order confirmation email sent successfully via direct SendGrid API');
      }
    } catch (error) {
      console.error('All email sending attempts failed:', error)
      
      // Log detailed error information
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
    }
  } catch (error) {
    console.error('Unhandled error in order-placed handler:', error)
  }
}

export const config: SubscriberConfig = {
  event: ['order.placed', 'LinkOrderCart.attached', 'LinkOrderPaymentCollection.attached', 'LinkCartPaymentCollection.attached']
}