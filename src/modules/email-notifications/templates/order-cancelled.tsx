import { Text, Section, Hr } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'
import { OrderDTO, OrderLineItemDTO } from '@medusajs/framework/types'

export const ORDER_CANCELLED = 'order-cancelled'

interface OrderCancelledPreviewProps {
  order: OrderDTO & { 
    display_id: string; 
    canceled_at: string;
    payment_status: string;
    items: Array<OrderLineItemDTO & {
      title: string;
      product_title?: string;
      unit_price: number;
    }>;
    discount_total: number;
    currency_code: string;
  }
  customer: {
    first_name: string;
    last_name: string;
  }
  order_link: string;
}

export interface OrderCancelledTemplateProps {
  order: OrderDTO & { 
    display_id: string; 
    canceled_at: string;
    payment_status: string;
    items: Array<OrderLineItemDTO & {
      title: string;
      product_title?: string;
      unit_price: number;
    }>;
    discount_total: number;
    currency_code: string;
  }
  customer: {
    first_name: string;
    last_name: string;
  }
  order_link: string;
  preview?: string;
}

export const isOrderCancelledTemplateData = (data: any): data is OrderCancelledTemplateProps =>
  typeof data.order === 'object' && 
  typeof data.customer === 'object' &&
  typeof data.order_link === 'string'

export const OrderCancelledTemplate: React.FC<OrderCancelledTemplateProps> & {
  PreviewProps: OrderCancelledPreviewProps
} = ({ order, customer, order_link, preview = 'Your order has been cancelled' }) => {
  return (
    <Base preview={preview}>
      <Section>
        <div style={{ backgroundColor: '#d32f2f', color: '#ffffff', textAlign: 'center', padding: '10px', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          Order Cancelled
        </div>

        <Text style={{ margin: '0 0 15px' }}>
          Hi {customer.first_name},
        </Text>

        <Text style={{ margin: '0 0 15px' }}>
          We regret to inform you that your order has been cancelled. Below are the details:
        </Text>

        <Text style={{ margin: '0 0 20px', fontWeight: 'bold' }}>
          Order #: {order.display_id} ({new Date(order.canceled_at).toLocaleDateString()})
        </Text>

        <div style={{
          width: '100%',
          borderCollapse: 'collapse',
          margin: '10px 0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#f8f8f8',
            padding: '10px',
            border: '1px solid #ddd'
          }}>
            <Text style={{ fontWeight: 'bold' }}>Product</Text>
            <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
            <Text style={{ fontWeight: 'bold' }}>Price</Text>
          </div>
          {order.items.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
              border: '1px solid #ddd'
            }}>
              <Text>{item.title}{item.product_title ? ` - ${item.product_title}` : ''}</Text>
              <Text>{item.quantity}</Text>
              <Text>{item.unit_price} {order.currency_code}</Text>
            </div>
          ))}
        </div>

        <Text style={{ margin: '20px 0 5px' }}>
          <strong>Subtotal:</strong> ${order.discount_total}
        </Text>
        
        <Text style={{ margin: '0 0 20px' }}>
          <strong>Payment Status:</strong> {order.payment_status}
        </Text>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <a href={order_link} style={{ 
            display: 'inline-block',
            width: '200px',
            textAlign: 'center',
            backgroundColor: '#782B8D',
            color: '#ffffff',
            padding: '10px',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '5px'
          }}>
            View Order Details
          </a>
        </div>

        <Text style={{ margin: '20px 0 5px' }}>
          If you have any questions, feel free to reach out.
        </Text>

        <Text style={{ margin: '0 0 0' }}>
          Cheers,<br /> Your Company Team
        </Text>
      </Section>
    </Base>
  )
}

OrderCancelledTemplate.PreviewProps = {
  order: {
    id: 'test-order-id',
    display_id: 'ORD-123',
    canceled_at: new Date().toISOString(),
    email: 'test@example.com',
    currency_code: 'USD',
    payment_status: 'Refunded',
    items: [
      { id: 'item-1', title: 'Product 1', quantity: 2, unit_price: 10 },
      { id: 'item-2', title: 'Product 2', quantity: 1, unit_price: 25 }
    ],
    discount_total: 45
  },
  customer: {
    first_name: 'Test',
    last_name: 'User'
  },
  order_link: 'https://example.com/orders/ORD-123'
} as OrderCancelledPreviewProps

export default OrderCancelledTemplate 