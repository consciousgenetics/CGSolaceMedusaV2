// Simple script to test SendGrid email directly
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// This should be set in your .env file
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || 'YOUR_API_KEY_HERE';
const SENDGRID_FROM = process.env.SENDGRID_FROM || 'info@consciousgenetics.com';
const TEST_EMAIL = process.env.TEST_EMAIL || 'info@consciousgenetics.com';

// Log environment variables for debugging
console.log('Environment variables:');
console.log('- SENDGRID_API_KEY set:', !!process.env.SENDGRID_API_KEY);
console.log('- SENDGRID_FROM:', process.env.SENDGRID_FROM);
console.log('- TEST_EMAIL:', TEST_EMAIL);

// Initialize SendGrid
sgMail.setApiKey(SENDGRID_API_KEY);

// Create a simple test message
const msg = {
  to: TEST_EMAIL,
  from: SENDGRID_FROM,
  subject: 'SendGrid Test Email',
  text: 'This is a test email to verify SendGrid is working',
  html: '<strong>This is a test email to verify SendGrid is working</strong>',
};

// Send the test email
console.log('Attempting to send test email...');
sgMail.send(msg)
  .then((response) => {
    console.log('Email sent successfully!');
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Error sending email:');
    console.error(error);
    
    // Check for SendGrid API response
    if (error.response) {
      console.error('SendGrid API error response:');
      console.error(error.response.body);
    }
  }); 