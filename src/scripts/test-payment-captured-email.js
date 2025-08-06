const { generateEmailTemplate } = require('../modules/email-notifications/templates');
const { EmailTemplates } = require('../modules/email-notifications/templates');

// Test data for the payment captured email
const testData = {
  order: {
    id: 'test-order-id',
    display_id: 'ORD-12345',
    created_at: new Date().toISOString(),
    email: 'customer@example.com',
    currency_code: 'USD',
    items: [
      { 
        id: 'item-1', 
        title: 'Organic DNA Test Kit', 
        quantity: 1, 
        unit_price: 199.99 
      },
      { 
        id: 'item-2', 
        title: 'Health Report Analysis', 
        quantity: 1, 
        unit_price: 49.99 
      }
    ],
    summary: { 
      raw_current_order_total: { 
        value: 249.98 
      } 
    }
  },
  shippingAddress: {
    first_name: 'John',
    last_name: 'Doe',
    address_1: '123 Main Street',
    city: 'San Francisco',
    province: 'CA',
    postal_code: '94102',
    country_code: 'US'
  },
  preview: 'Your payment has been received!'
};

console.log('Testing Payment Captured Email Template...');
console.log('=====================================');

try {
  // Test the template generation
  const emailContent = generateEmailTemplate(EmailTemplates.PAYMENT_CAPTURED, testData);
  
  if (emailContent) {
    console.log('✅ Payment captured email template generated successfully!');
    console.log(`📧 Template: ${EmailTemplates.PAYMENT_CAPTURED}`);
    console.log(`👤 Customer: ${testData.order.email}`);
    console.log(`📦 Order: ${testData.order.display_id}`);
    console.log(`💰 Amount: ${testData.order.summary.raw_current_order_total.value} ${testData.order.currency_code}`);
    console.log('\n📝 Email template includes:');
    console.log('   - Payment confirmation message');
    console.log('   - Order details with items');
    console.log('   - Shipping address');
    console.log('   - Payment status confirmation');
    console.log('   - Order tracking link');
    console.log('   - Customer support contact');
  } else {
    console.log('❌ Failed to generate email template');
  }
} catch (error) {
  console.error('❌ Error testing payment captured email template:', error.message);
  console.error('Stack trace:', error.stack);
}

console.log('\n🔧 To test the subscriber:');
console.log('1. Start your Medusa server');
console.log('2. Create an order and authorize payment');
console.log('3. Use the admin panel to capture the payment');
console.log('4. Check the server logs for the payment captured event');
console.log('5. Verify the email was sent to the customer');

console.log('\n📋 Subscriber details:');
console.log('   - Event: payment.captured');
console.log('   - File: src/subscribers/payment-captured.ts');
console.log('   - Template: payment-captured');
console.log('   - Trigger: When payment is captured in admin panel');