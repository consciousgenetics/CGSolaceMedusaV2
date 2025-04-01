"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderPlacedHandler;
const utils_1 = require("@medusajs/framework/utils");
const axios_1 = __importDefault(require("axios"));
// The known publishable API key
const PUBLISHABLE_API_KEY = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c';
async function orderPlacedHandler({ event: { data }, container, }) {
    var _a;
    try {
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
                const apiToken = process.env.MEDUSA_ADMIN_API_TOKEN || process.env.COOKIE_SECRET;
                const response = await axios_1.default.get(`${baseUrl}/admin/orders/${data.id}`, {
                    headers: {
                        'x-medusa-access-token': apiToken
                    }
                });
                order = response.data.order;
                console.log('Order fetched successfully via admin API');
            }
        }
        catch (err) {
            console.error('Error fetching order via API:', err.message);
            // Last resort - use the order data from the event if available
            if (data.email && data.items) {
                console.log('Using order data from event as fallback');
                order = data;
            }
            else {
                return;
            }
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
            console.log('Order confirmation email sent successfully');
        }
        catch (error) {
            console.error('Error sending order confirmation notification:', error);
        }
    }
    catch (error) {
        console.error('Unhandled error in order-placed handler:', error);
    }
}
exports.config = {
    event: 'order.placed'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL29yZGVyLXBsYWNlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFTQSxxQ0FzSEM7QUEvSEQscURBQW1EO0FBSW5ELGtEQUF5QjtBQUV6QixnQ0FBZ0M7QUFDaEMsTUFBTSxtQkFBbUIsR0FBRyxxRUFBcUUsQ0FBQTtBQUVsRixLQUFLLFVBQVUsa0JBQWtCLENBQUMsRUFDL0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQ2YsU0FBUyxHQUNXOztJQUNwQixJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUUzRixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQTtZQUNwRSxPQUFNO1FBQ1IsQ0FBQztRQUVELHVDQUF1QztRQUN2QyxNQUFNLHlCQUF5QixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBRXpFLHlFQUF5RTtRQUN6RSxJQUFJLEtBQUssQ0FBQTtRQUNULElBQUksQ0FBQztZQUNILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLHVCQUF1QixDQUFBO1lBRWxFLHNEQUFzRDtZQUN0RCxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUM5QixHQUFHLE9BQU8saUJBQWlCLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFDcEM7b0JBQ0UsT0FBTyxFQUFFO3dCQUNQLHVCQUF1QixFQUFFLG1CQUFtQjtxQkFD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