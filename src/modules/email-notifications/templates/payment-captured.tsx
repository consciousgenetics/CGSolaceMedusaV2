import { Text, Section } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types'

export const PAYMENT_CAPTURED = 'payment-captured'

interface PaymentCapturedPreviewProps {
  order: OrderDTO & {
    display_id: string
    currency_code: string
    items: Array<{
      id: string
      title: string
      quantity: number
      unit_price: number
    }>
    summary: { raw_current_order_total: { value: number } }
  }
  shippingAddress?: OrderAddressDTO | null
}

export interface PaymentCapturedTemplateProps {
  order: OrderDTO & {
    display_id: string
    currency_code: string
    items: Array<{
      id: string
      title: string
      quantity: number
      unit_price: number
    }>
    summary: { raw_current_order_total: { value: number } }
  }
  shippingAddress?: OrderAddressDTO | null
  preview?: string
}

export const isPaymentCapturedTemplateData = (data: any): data is PaymentCapturedTemplateProps =>
  typeof data?.order === 'object'

export const PaymentCapturedTemplate: React.FC<PaymentCapturedTemplateProps> & {
  PreviewProps: PaymentCapturedPreviewProps
} = ({ order, shippingAddress, preview = 'Your payment has been received!' }) => {
  return (
    <Base preview={preview}>
      <Section style={{ maxWidth: '600px', background: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
          <img src="https://consciousgenetics.lon1.cdn.digitaloceanspaces.com/130.png" alt="Conscious Genetics" style={{ maxWidth: '150px' }} />
          <Text style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>Payment received</Text>
        </div>

        <Text style={{ margin: '0 0 20px' }}>
          Thank you! We have received your payment. Below is a summary of your order.
        </Text>

        {shippingAddress ? (
          <div style={{ margin: '20px 0' }}>
            <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>Shipping Address</Text>
            <Text style={{ margin: '0 0 5px' }}>{shippingAddress.first_name} {shippingAddress.last_name}</Text>
            <Text style={{ margin: '0 0 5px' }}>{shippingAddress.address_1}</Text>
            <Text style={{ margin: '0 0 5px' }}>{shippingAddress.city}, {shippingAddress.province} {shippingAddress.postal_code}</Text>
            <Text style={{ margin: '0 0 20px' }}>{shippingAddress.country_code}</Text>
          </div>
        ) : null}

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
            Total paid: {order.summary.raw_current_order_total.value} {order.currency_code}
          </Text>
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
    display_id: 'ORD-12345',
    created_at: new Date().toISOString(),
    email: 'customer@example.com',
    currency_code: 'USD',
    items: [
      { id: 'item-1', title: 'Organic DNA Test Kit', quantity: 1, unit_price: 199.99 },
      { id: 'item-2', title: 'Health Report Analysis', quantity: 1, unit_price: 49.99 }
    ],
    summary: { raw_current_order_total: { value: 249.98 } }
  },
  shippingAddress: {
    first_name: 'John',
    last_name: 'Doe',
    address_1: '123 Main Street',
    city: 'San Francisco',
    province: 'CA',
    postal_code: '94102',
    country_code: 'US'
  }
} as PaymentCapturedPreviewProps

export default PaymentCapturedTemplate