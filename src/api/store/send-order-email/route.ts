import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules } from '@medusajs/framework/utils';
import axios from 'axios';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// The known publishable API key
const PUBLISHABLE_API_KEY = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c';

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const orderId = req.query.orderId as string;
    
    if (!orderId) {
      res.status(400).json({ 
        success: false, 
        message: "Missing orderId parameter" 
      });
      return;
    }
    
    // Fetch order data from the store API
    let order;
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:9000';
    
    try {
      const response = await axios.get(
        `${baseUrl}/store/orders/${orderId}`, 
        {
          headers: {
            'x-publishable-api-key': PUBLISHABLE_API_KEY
          }
        }
      );
      order = (response.data as { order: any }).order;
      console.log('Order fetched successfully');
    } catch (error) {
      res.status(404).json({ 
        success: false, 
        message: "Order not found", 
        error: error.message 
      });
      return;
    }
    
    if (!order || !order.email) {
      res.status(404).json({ 
        success: false, 
        message: "Order not found or missing email" 
      });
      return;
    }
    
    // Use the order data directly
    const shippingAddress = order.shipping_address || {};
    
    // Create enriched order object
    const enrichedOrder = { ...order };
    
    // Send email directly via SendGrid
    const msg = {
      subject: "Conscious Genetics Order Submitted",
      to: order.email,
      from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
      templateId: process.env.SENDGRID_ORDER_PLACED_ID,
      dynamicTemplateData: {
        order: enrichedOrder,
        shippingAddress,
        preview: 'Thank you for your order!',
        subject: "Conscious Genetics Order Submitted"
      },
      categories: ['order-confirmation'],
      customArgs: {
        subject: "Conscious Genetics Order Submitted"
      }
    };
    
    await sgMail.send(msg);
    
    res.json({ 
      success: true, 
      message: `Order confirmation email sent to ${order.email}` 
    });
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send email", 
      error: error.message 
    });
  }
} 