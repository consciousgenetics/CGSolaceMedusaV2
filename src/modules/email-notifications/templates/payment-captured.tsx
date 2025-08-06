import { Text, Section, Hr } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types'

export const PAYMENT_CAPTURED = 'payment-captured'

interface PaymentCapturedPreviewProps {
  order: OrderDTO & { display_id: string; summary: { raw_current_order_total: { value: number } } }
  shippingAddress: OrderAddressDTO
}

export interface PaymentCapturedTemplateProps {
  order: OrderDTO & { display_id: string; summary: { raw_current_order_total: { value: number } } }
  shippingAddress: OrderAddressDTO
  preview?: string
}

export const isPaymentCapturedTemplateData = (data: any): data is PaymentCapturedTemplateProps =>
  typeof data.order === 'object' && typeof data.shippingAddress === 'object'

export const PaymentCapturedTemplate: React.FC<PaymentCapturedTemplateProps> & {
  PreviewProps: PaymentCapturedPreviewProps
} = ({ order, shippingAddress, preview = 'Your payment has been received!' }) => {
  return (
    <Base preview={preview}>
      <Section style={{ maxWidth: '600px', background: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
          <img src="https://consciousgenetics.lon1.cdn.digitaloceanspaces.com/130.png" alt="Conscious Genetics" style={{ maxWidth: '150px' }} />
          <Text style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>Payment Received!</Text>
        </div>

        <Text style={{ margin: '0 0 20px' }}>
          Great news! We have successfully received your payment for order #{order.display_id}. Your order is now being processed and will be shipped soon.
        </Text>

        <div style={{ margin: '20px 0' }}>
          <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>Shipping Address</Text>
          <Text style={{ margin: '0 0 5px' }}>{shippingAddress.first_name} {shippingAddress.last_name}</Text>
          <Text style={{ margin: '0 0 5px' }}>{shippingAddress.address_1}</Text>
          <Text style={{ margin: '0 0 5px' }}>{shippingAddress.city}, {shippingAddress.province} {shippingAddress.postal_code}</Text>
          <Text style={{ margin: '0 0 20px' }}>{shippingAddress.country_code}</Text>
        </div>

        <div style={{ margin: '20px 0' }}>
          <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 15px' }}>Order Summary</Text>
          <div style={{ width: '100%', borderCollapse: 'collapse', margin: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f2f2f2', padding: '8px', borderBottom: '1px solid #ddd' }}>
              <Text style={{ fontWeight: 'bold' }}>Item</Text>
              <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
              <Text style={{ fontWeight: 'bold' }}>Price</Text>
            </div>
            {order.items.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #ddd' }}>
                <Text>{item.title}</Text>
                <Text>{item.quantity}</Text>
                <Text>{item.unit_price} {order.currency_code}</Text>
              </div>
            ))}
          </div>
          <Text style={{ margin: '20px 0', fontWeight: 'bold' }}>
            Total Paid: {order.summary.raw_current_order_total.value} {order.currency_code}
          </Text>
        </div>

        <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
          <Text style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 10px' }}>✅ Payment Confirmed</Text>
          <Text style={{ margin: '0 0 5px' }}>Payment Method: Card Payment</Text>
          <Text style={{ margin: '0' }}>Status: Successfully Processed</Text>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <a href={`${process.env.STORE_URL}/orders/${order.display_id}`} style={{
            display: 'inline-block',
            width: '200px',
            margin: '20px auto',
            padding: '10px',
            background: '#782B8D',
            color: '#ffffff',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '5px'
          }}>
            View your order
          </a>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '20px', fontSize: '14px' }}>
          <Text>Need help? Contact us at <a href="mailto:info@consciousgenetics.com" style={{ color: '#782B8D' }}>info@consciousgenetics.com</a></Text>
        </div>
      </Section>
    </Base>
  )
}

PaymentCapturedTemplate.PreviewProps = {
  order: {
    id: 'test-order-id',
    display_id: 'ORD-123',
    created_at: new Date().toISOString(),
    email: 'test@example.com',
    currency_code: 'USD',
    items: [
      { id: 'item-1', title: 'Item 1', quantity: 2, unit_price: 10 },
      { id: 'item-2', title: 'Item 2', quantity: 1, unit_price: 25 }
    ],
    summary: { raw_current_order_total: { value: 45 } }
  },
  shippingAddress: {
    first_name: 'Test',
    last_name: 'User',
    address_1: '123 Main St',
    city: 'Anytown',
    province: 'CA',
    postal_code: '12345',
    country_code: 'US'
  }
} as PaymentCapturedPreviewProps

export default PaymentCapturedTemplate