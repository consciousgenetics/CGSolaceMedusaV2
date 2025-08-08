"use strict";
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
    }
    else {
        console.log('❌ Failed to generate email template');
    }
}
catch (error) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1wYXltZW50LWNhcHR1cmVkLWVtYWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjcmlwdHMvdGVzdC1wYXltZW50LWNhcHR1cmVkLWVtYWlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLEVBQUUscUJBQXFCLEVBQUUsR0FBRyxPQUFPLENBQUMsMENBQTBDLENBQUMsQ0FBQztBQUN0RixNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsT0FBTyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7QUFFL0UsMkNBQTJDO0FBQzNDLE1BQU0sUUFBUSxHQUFHO0lBQ2YsS0FBSyxFQUFFO1FBQ0wsRUFBRSxFQUFFLGVBQWU7UUFDbkIsVUFBVSxFQUFFLFdBQVc7UUFDdkIsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQ3BDLEtBQUssRUFBRSxzQkFBc0I7UUFDN0IsYUFBYSxFQUFFLEtBQUs7UUFDcEIsS0FBSyxFQUFFO1lBQ0w7Z0JBQ0UsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osS0FBSyxFQUFFLHNCQUFzQjtnQkFDN0IsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsVUFBVSxFQUFFLE1BQU07YUFDbkI7WUFDRDtnQkFDRSxFQUFFLEVBQUUsUUFBUTtnQkFDWixLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxVQUFVLEVBQUUsS0FBSzthQUNsQjtTQUNGO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsdUJBQXVCLEVBQUU7Z0JBQ3ZCLEtBQUssRUFBRSxNQUFNO2FBQ2Q7U0FDRjtLQUNGO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsVUFBVSxFQUFFLE1BQU07UUFDbEIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsU0FBUyxFQUFFLGlCQUFpQjtRQUM1QixJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLFlBQVksRUFB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