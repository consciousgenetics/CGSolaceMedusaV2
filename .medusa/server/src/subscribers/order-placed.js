"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderPlacedHandler;
const utils_1 = require("@medusajs/framework/utils");
const axios_1 = __importDefault(require("axios"));
// Import SendGrid directly
const mail_1 = __importDefault(require("@sendgrid/mail"));
// The known publishable API key
const PUBLISHABLE_API_KEY = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c';
// Admin email address
const ADMIN_EMAIL = 'info@consciousgenetics.com';
// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('💌 Customer notifier: SendGrid initialized');
}
else {
    console.error('❌ Customer notifier: SENDGRID_API_KEY is not set!');
}
async function orderPlacedHandler({ event, container, }) {
    try {
        console.log('🔔 Customer notifier received event:', event.name);
        // Only process order.placed events - we're now using the event-bridge to convert LinkOrderCart events
        if (event.name !== 'order.placed') {
            console.log(`Customer notifier ignoring event ${event.name}`);
            return;
        }
        // Extract data from the event
        const { data } = event;
        console.log('Customer notifier processing order event:', JSON.stringify(data || {}, null, 2));
        if (!data || !data.id) {
            console.error('❌ Customer notifier: Invalid data received');
            return;
        }
        // Use the notification module directly
        const notificationModuleService = container.resolve(utils_1.Modules.NOTIFICATION);
        const baseUrl = process.env.BACKEND_URL || 'http://localhost:9000';
        const apiToken = process.env.MEDUSA_ADMIN_API_TOKEN || process.env.COOKIE_SECRET;
        // For order.placed events, use the order ID directly
        const orderId = data.id;
        // Fetch order data
        let order;
        try {
            console.log('🔍 Customer notifier: Fetching order via store API:', orderId);
            // Use the store API with the provided publishable key
            try {
                const response = await axios_1.default.get(`${baseUrl}/store/orders/${orderId}`, {
                    headers: {
                        'x-publishable-api-key': PUBLISHABLE_API_KEY
                    }
                });
                order = response.data.order;
                console.log('✅ Customer notifier: Order fetched successfully via store API');
            }
            catch (storeErr) {
                console.error('❌ Customer notifier: Store API failed:', storeErr.message);
                // If store API still fails, try admin API as fallback
                console.log('🔄 Customer notifier: Falling back to admin API...');
                try {
                    console.log('🔍 Customer notifier: Fetching order via admin API:', orderId);
                    const response = await axios_1.default.get(`${baseUrl}/admin/orders/${orderId}`, {
                        headers: {
                            'x-medusa-access-token': apiToken
                        }
                    });
                    order = response.data.order;
                    console.log('✅ Customer notifier: Order fetched successfully via admin API');
                }
                catch (adminErr) {
                    console.error('❌ Customer notifier: Admin API failed:', adminErr.message);
                    // Last resort - use the order data from the event if available
                    if (data.email && data.items) {
                        console.log('🔄 Customer notifier: Using order data from event as fallback');
                        order = data;
                    }
                    else if (data.result && data.result.order) {
                        console.log('🔄 Customer notifier: Using order data from cart completion result');
                        order = data.result.order;
                    }
                    else {
                        // If both API calls fail and we only have an order ID, create a minimal order object
                        console.log('🔄 Customer notifier: Creating minimal order object from ID');
                        order = {
                            id: orderId,
                            // Create a generic email for testing purposes
                            email: `order-${orderId}@example.com`,
                            ...data // Include any other data from the event
                        };
                    }
                }
            }
        }
        catch (err) {
            console.error('❌ Customer notifier: Error fetching order via API:', err.message);
            return;
        }
        if (!order) {
            console.error('❌ Customer notifier: Order not found or could not be retrieved');
            return;
        }
        console.log("Customer notifier: Order retrieved successfully:", `ID: ${order.id}, ` +
            `Customer: ${order.email}, ` +
            `Total: ${order.total}`);
        // Use the order data directly
        const shippingAddress = order.shipping_address || {};
        // Log original price values for debugging
        console.log('💰 Customer notifier: Original price values:', {
            subtotal: order.subtotal,
            tax_total: order.tax_total,
            shipping_total: order.shipping_total,
            discount_total: order.discount_total,
            total: order.total
        });
        // Format the order for the template
        const formattedOrder = formatOrderForTemplate(order);
        // Log formatted price values
        console.log('💵 Customer notifier: Formatted price values:', {
            subtotal: formattedOrder.subtotal,
            tax_total: formattedOrder.tax_total,
            shipping_total: formattedOrder.shipping_total,
            discount_total: formattedOrder.discount_total,
            total: formattedOrder.total
        });
        // Only proceed if we have a valid email
        if (!order.email) {
            console.error('❌ Customer notifier: Order is missing email address');
            return;
        }
        try {
            console.log('📧 Customer notifier: Sending email to:', order.email);
            console.log('📄 Customer notifier: Using template ID:', process.env.SENDGRID_ORDER_PLACED_ID);
            // First try using Medusa's notification module for customer email
            try {
                await notificationModuleService.createNotifications({
                    to: order.email,
                    channel: 'email',
                    template: process.env.SENDGRID_ORDER_PLACED_ID,
                    data: {
                        emailOptions: {
                            from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
                            replyTo: 'info@consciousgenetics.com',
                            subject: 'Conscious Genetics Order Submitted'
                        },
                        order: formattedOrder,
                        shippingAddress,
                        preview: 'Thank you for your order!'
                    }
                });
                console.log('✅ Customer notifier: Email sent successfully via Medusa notification module');
            }
            catch (medusaError) {
                console.error('❌ Customer notifier: Error sending via Medusa module:', medusaError);
                // If Medusa's notification fails, try sending directly via SendGrid
                console.log('🔄 Customer notifier: Falling back to direct SendGrid API...');
                // Use SendGrid directly as a fallback for customer
                const msg = {
                    subject: 'Conscious Genetics Order Submitted',
                    to: order.email,
                    from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
                    templateId: process.env.SENDGRID_ORDER_PLACED_ID,
                    dynamicTemplateData: {
                        order: formattedOrder,
                        shippingAddress,
                        preview: 'Thank you for your order!',
                        subject: 'Conscious Genetics Order Submitted'
                    },
                    categories: ['order-confirmation'],
                    customArgs: {
                        subject: 'Conscious Genetics Order Submitted'
                    }
                };
                await mail_1.default.send(msg);
                console.log('✅ Customer notifier: Email sent successfully via direct SendGrid API');
            }
        }
        catch (error) {
            console.error('❌ Customer notifier: All email sending attempts failed:', error);
            // Log detailed error information
            if (error instanceof Error) {
                console.error('❌ Customer notifier: Error details:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
            }
        }
    }
    catch (error) {
        console.error('❌ Customer notifier: Unhandled error:', error);
    }
}
/**
 * Format monetary values properly from cents to dollars/pounds
 */
function formatMoney(value) {
    if (value === null || value === undefined) {
        return "0";
    }
    
    // Make sure we're working with a number
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // Return whole number value without dividing by 100
    return Math.round(numValue).toString();
}
/**
 * Format the order object for the email template
 */
function formatOrderForTemplate(order) {
    // Format the order items
    const formattedItems = order.items ? order.items.map(item => {
        var _a;
        return ({
            ...item,
            unit_price: formatMoney(item.unit_price),
            title: item.title || (((_a = item.variant) === null || _a === void 0 ? void 0 : _a.title) || ''),
            variant: item.variant || {}
        });
    }) : [];
    // Return the formatted order object
    return {
        ...order,
        display_id: order.display_id || order.id,
        total: formatMoney(order.total),
        subtotal: formatMoney(order.subtotal),
        tax_total: formatMoney(order.tax_total),
        shipping_total: formatMoney(order.shipping_total),
        discount_total: formatMoney(order.discount_total || 0),
        items: formattedItems
    };
}
// Now ONLY listen for order.placed events - the event-bridge will convert LinkOrderCart events
exports.config = {
    event: ['order.placed']
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL29yZGVyLXBsYWNlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFxQkEscUNBNkxDO0FBbE5ELHFEQUFtRDtBQUluRCxrREFBeUI7QUFDekIsMkJBQTJCO0FBQzNCLDBEQUFtQztBQUVuQyxnQ0FBZ0M7QUFDaEMsTUFBTSxtQkFBbUIsR0FBRyxxRUFBcUUsQ0FBQTtBQUNqRyxzQkFBc0I7QUFDdEIsTUFBTSxXQUFXLEdBQUcsNEJBQTRCLENBQUE7QUFFaEQsc0JBQXNCO0FBQ3RCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLGNBQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQTtBQUMzRCxDQUFDO0tBQU0sQ0FBQztJQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQTtBQUNwRSxDQUFDO0FBRWMsS0FBSyxVQUFVLGtCQUFrQixDQUFDLEVBQy9DLEtBQUssRUFDTCxTQUFTLEdBQ1c7SUFDcEIsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEUsc0dBQXNHO1FBQ3RHLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUUsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM5RCxPQUFPO1FBQ1QsQ0FBQztRQUVELDhCQUE4QjtRQUM5QixNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJD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