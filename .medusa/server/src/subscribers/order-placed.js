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
// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
}
async function orderPlacedHandler({ event, container, }) {
    var _a;
    try {
        console.log('Event received:', event.name);
        // Check which event was triggered
        if (event.name === 'LinkCartPaymentCollection.attached') {
            console.log('Cart payment collection attached:', event.data);
            // This event is triggered when a payment collection is linked to a cart
            // We don't need to send an email for this event
            return;
        }
        if (event.name === 'LinkOrderCart.attached') {
            console.log('Cart attached to order:', event.data);
            // This event is triggered when a cart is linked to an order
            // We don't need to send an email for this event
            return;
        }
        if (event.name === 'LinkOrderPaymentCollection.attached') {
            console.log('Payment collection attached to order:', event.data);
            // This event is triggered when a payment collection is linked to an order
            // We don't need to send an email for this event
            return;
        }
        // If we get here, it's the order.placed event
        const { data } = event;
        console.log('Order placed handler started with data:', JSON.stringify(data || {}, null, 2));
        if (!data || !data.id) {
            console.error('Invalid order data received in order-placed handler');
            return;
        }
        // Use the notification module directly
        const notificationModuleService = container.resolve(utils_1.Modules.NOTIFICATION);
        // Fetch order data from the store API with the known publishable API key
        let order;
        try {
            const baseUrl = process.env.BACKEND_URL || 'http://localhost:9000';
            // Use the store API with the provided publishable key
            try {
                const response = await axios_1.default.get(`${baseUrl}/store/orders/${data.id}`, {
                    headers: {
                        'x-publishable-api-key': PUBLISHABLE_API_KEY
                    }
                });
                order = response.data.order;
                console.log('Order fetched successfully via store API');
            }
            catch (storeErr) {
                console.error('Store API failed:', storeErr.message);
                // If store API still fails, try admin API as fallback
                console.log('Falling back to admin API...');
                try {
                    const apiToken = process.env.MEDUSA_ADMIN_API_TOKEN || process.env.COOKIE_SECRET;
                    const response = await axios_1.default.get(`${baseUrl}/admin/orders/${data.id}`, {
                        headers: {
                            'x-medusa-access-token': apiToken
                        }
                    });
                    order = response.data.order;
                    console.log('Order fetched successfully via admin API');
                }
                catch (adminErr) {
                    console.error('Admin API failed:', adminErr.message);
                    // Last resort - use the order data from the event if available
                    if (data.email && data.items) {
                        console.log('Using order data from event as fallback');
                        order = data;
                    }
                    else {
                        // If both API calls fail and we only have an order ID, create a minimal order object
                        console.log('Creating minimal order object from ID');
                        order = {
                            id: data.id,
                            // Create a generic email for testing purposes
                            email: `order-${data.id}@example.com`,
                            ...data // Include any other data from the event
                        };
                    }
                }
            }
        }
        catch (err) {
            console.error('Error fetching order via API:', err.message);
            return;
        }
        if (!order) {
            console.error('Order not found or could not be retrieved');
            return;
        }
        console.log("Order retrieved successfully, analyzing structure:", `ID: ${order.id}, ` +
            `Has items: ${!!(order.items && order.items.length)}, ` +
            `Item count: ${((_a = order.items) === null || _a === void 0 ? void 0 : _a.length) || 0}, ` +
            `Has shipping address: ${!!order.shipping_address}, ` +
            `Email: ${order.email}`);
        // Use the order data directly
        const shippingAddress = order.shipping_address || {};
        console.log('ORDER VALUES FROM API:', {
            subtotal: order.subtotal,
            tax_total: order.tax_total,
            shipping_total: order.shipping_total,
            discount_total: order.discount_total,
            total: order.total
        });
        // Create enriched order object using original values
        const enrichedOrder = {
            ...order
        };
        // Only proceed if we have a valid email
        if (!order.email) {
            console.error('Order is missing email address');
            return;
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
                });
                console.log('Order confirmation email sent successfully via Medusa notification module');
            }
            catch (medusaError) {
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
                await mail_1.default.send(msg);
                console.log('Order confirmation email sent successfully via direct SendGrid API');
            }
        }
        catch (error) {
            console.error('All email sending attempts failed:', error);
            // Log detailed error information
            if (error instanceof Error) {
                console.error('Error details:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
            }
        }
    }
    catch (error) {
        console.error('Unhandled error in order-placed handler:', error);
    }
}
exports.config = {
    event: ['order.placed', 'LinkOrderCart.attached', 'LinkOrderPaymentCollection.attached', 'LinkCartPaymentCollection.attached']
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL29yZGVyLXBsYWNlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFnQkEscUNBaU1DO0FBak5ELHFEQUFtRDtBQUluRCxrREFBeUI7QUFDekIsMkJBQTJCO0FBQzNCLDBEQUFtQztBQUVuQyxnQ0FBZ0M7QUFDaEMsTUFBTSxtQkFBbUIsR0FBRyxxRUFBcUUsQ0FBQTtBQUVqRyxzQkFBc0I7QUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDakMsY0FBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFDaEQsQ0FBQztBQUVjLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxFQUMvQyxLQUFLLEVBQ0wsU0FBUyxHQUNXOztJQUNwQixJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQyxrQ0FBa0M7UUFDbEMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLG9DQUFvQyxFQUFFLENBQUM7WUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0Qsd0VBQXdFO1lBQ3hFLGdEQUFnRDtZQUNoRCxPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyx3QkFBd0IsRUFBRSxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELDREQUE0RDtZQUM1RCxnREFBZ0Q7WUFDaEQsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUsscUNBQXFDLEVBQUUsQ0FBQztZQUN6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