"use strict";
// Simple script to test SendGrid directly
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
// Set your API key
const apiKey = process.env.SENDGRID_API_KEY;
console.log('API Key available:', !!apiKey);
if (!apiKey) {
    console.error('No SendGrid API key found in environment variables');
    process.exit(1);
}
sgMail.setApiKey(apiKey);
// Log the template ID for verification
console.log('Using template ID:', process.env.SENDGRID_ORDER_PLACED_ID);
console.log('From email:', process.env.SENDGRID_FROM);
// Your test email data
const msg = {
    to: 'muhammad@flipifymedia.com', // Your actual email address
    from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
    templateId: process.env.SENDGRID_ORDER_PLACED_ID,
    dynamicTemplateData: {
        order: {
            id: 'test-order-id',
            display_id: 'TEST-123',
            items: [
                { title: 'Test Product', quantity: 1, unit_price: 19.99 }
            ],
            total: 19.99,
            currency_code: 'USD'
        },
        shippingAddress: {
            first_name: 'Test',
            last_name: 'User',
            address_1: '123 Test St',
            city: 'Testville',
            country_code: 'US'
        },
        preview: 'Test order confirmation'
    }
};
// Send the email
console.log('Sending test email to:', msg.to);
sgMail.send(msg)
    .then(() => {
    console.log('Email sent successfully!');
})
    .catch((error) => {
    console.error('Error sending email:');
    console.error(error.response ? error.response.body : error);
    // Check if it's a template issue
    if (error.message && error.message.includes('template_id')) {
        console.error('The template ID may be invalid or not active');
    }
    // Check if it's a sender authentication issue
    if (error.message && error.message.includes('from address')) {
        console.error('The from address may not be verified in your SendGrid account');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1zZW5kZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0LXNlbmRncmlkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQ0FBMEM7QUFDMUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRXpDLG1CQUFtQjtBQUNuQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztJQUNwRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUM7QUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXpCLHVDQUF1QztBQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXRELHVCQUF1QjtBQUN2QixNQUFNLEdBQUcsR0FBRztJQUNWLEVBQUUsRUFBRSwyQkFBMkIsRUFBRSw0QkFBNEI7SUFDN0QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLDRCQUE0QjtJQUMvRCxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0I7SUFDaEQsbUJBQW1CLEVBQUU7UUFDbkIsS0FBSyxFQUFFO1lBQ0wsRUFBRSxFQUFFLGVBQWU7WUFDbkIsVUFBVSxFQUFFLFVBQVU7WUFDdEIsS0FBSyxFQUFFO2dCQUNMLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7YUFDMUQ7WUFDRCxLQUFLLEVBQUUsS0FBSztZQUNaLGFBQWEsRUFBRSxLQUFLO1NBQ3JCO1FBQ0QsZUFBZSxFQUFFO1lBQ2YsVUFBVSxFQUFFLE1BQU07WUFDbEIsU0FBUyxFQUFFLE1BQU07WUFDakIsU0FBUyxFQUFFLGFBQWE7WUFDeEIsSUFBSSxFQUFFLFdBQVc7WUFDakIsWUFBWSxFQUFFLElBQUk7U0FDbkI7UUFDRCxPQUFPLEVBQUUseUJBQXlCO0tBQ25DO0NBQ0YsQ0FBQztBQUVGLGlCQUFpQjtBQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNiLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDO0tBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFNUQsaUNBQWlDO0lBQ2pDLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQzNELE9BQU8sQ0FBQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsOENBQThDO0lBQzlDLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO1FBQzVELE9BQU8sQ0FBQyxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztJQUNqRixDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==