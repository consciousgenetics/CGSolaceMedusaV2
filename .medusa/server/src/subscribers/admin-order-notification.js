"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = adminOrderNotificationHandler;
const axios_1 = __importDefault(require("axios"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
// Constants
const PUBLISHABLE_API_KEY = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c';
const ADMIN_EMAIL = 'info@consciousgenetics.com';
// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('💌 Admin notifier: SendGrid initialized');
}
else {
    console.error('❌ Admin notifier: SENDGRID_API_KEY is not set!');
}
/**
 * This subscriber handles sending order notifications to the admin email
 * It's separate from the customer notification to ensure reliability
 */
async function adminOrderNotificationHandler({ event, container, }) {
    var _a;
    try {
        console.log("👨‍💼 Admin notifier received event:", event.name);
        // Accept the same events as the order-placed subscriber
        const validEvents = ['order.placed', 'LinkOrderCart.attached'];
        if (!validEvents.includes(event.name)) {
            console.log(`Admin notifier ignoring event ${event.name}`);
            return;
        }
        // Extract data from the event
        const { data } = event;
        console.log("Admin notifier processing event data:", JSON.stringify(data || {}, null, 2));
        if (!data || !data.id) {
            console.error("❌ Admin notifier: Invalid data received");
            return;
        }
        // Get the order ID based on event type
        let orderId = data.id;
        const baseUrl = process.env.BACKEND_URL || "http://localhost:9000";
        // For LinkOrderCart.attached events, we need to get the most recent order
        if (event.name === 'LinkOrderCart.attached') {
            try {
                console.log("🔍 Admin notifier: Fetching most recent order...");
                const response = await axios_1.default.get(`${baseUrl}/store/orders?limit=1`, {
                    headers: {
                        "x-publishable-api-key": PUBLISHABLE_API_KEY
                    }
                });
                if (response.data.orders && response.data.orders.length > 0) {
                    orderId = response.data.orders[0].id;
                    console.log("✅ Admin notifier: Found recent order ID:", orderId);
                }
                else {
                    console.error("❌ Admin notifier: No recent orders found");
                    return;
                }
            }
            catch (error) {
                console.error("❌ Admin notifier: Failed to fetch recent orders:", error.message);
                return;
            }
        }
        // Fetch the order details
        let order;
        try {
            // For admin notification, always try to get full details from store API
            console.log("📦 Admin notifier: Fetching order details for:", orderId);
            const response = await axios_1.default.get(`${baseUrl}/store/orders/${orderId}`, {
                headers: {
                    "x-publishable-api-key": PUBLISHABLE_API_KEY
                }
            });
            order = response.data.order;
            console.log("✅ Admin notifier: Order details retrieved successfully");
        }
        catch (error) {
            console.error("❌ Admin notifier: Failed to fetch order details:", error.message);
            return;
        }
        if (!order) {
            console.error("❌ Admin notifier: Order not found");
            return;
        }
        // Extract necessary information from the order
        const customerEmail = order.email || 'unknown@email.com';
        const shippingAddress = order.shipping_address || {};
        // Log original price values
        console.log("💰 Admin notifier: Original price values:", {
            total: order.total,
            subtotal: order.subtotal,
            tax_total: order.tax_total,
            shipping_total: order.shipping_total
        });
        // Format the order for the template
        const formattedOrder = formatOrderForTemplate(order);
        // Log formatted price values
        console.log("💵 Admin notifier: Formatted price values:", {
            total: formattedOrder.total,
            subtotal: formattedOrder.subtotal,
            tax_total: formattedOrder.tax_total,
            shipping_total: formattedOrder.shipping_total
        });
        // Send the admin notification email
        try {
            // Try the template first
            const templateId = process.env.SENDGRID_ADMIN_NOTIFICATION_ID || process.env.SENDGRID_ORDER_PLACED_ID;
            console.log(`📧 Admin notifier: Sending email to ${ADMIN_EMAIL} with template ${templateId}`);
            const msg = {
                to: ADMIN_EMAIL,
                from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
                subject: `New Order #${order.display_id || order.id} from ${customerEmail}`,
                templateId,
                dynamicTemplateData: {
                    order: formattedOrder,
                    shippingAddress,
                    preview: `New Order #${order.display_id || order.id}`,
                    currentYear: new Date().getFullYear()
                }
            };
            const response = await mail_1.default.send(msg);
            console.log("✅ Admin notifier: Email sent successfully, status:", (_a = response[0]) === null || _a === void 0 ? void 0 : _a.statusCode);
        }
        catch (error) {
            console.error("❌ Admin notifier: Failed to send email with template:", error.message);
            // If template email fails, try a simpler approach
            try {
                console.log("🔄 Admin notifier: Trying simple text email as fallback...");
                const simpleMsg = {
                    to: ADMIN_EMAIL,
                    from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
                    subject: `New Order #${order.display_id || order.id} from ${customerEmail}`,
                    text: `
            A new order has been placed:
            
            Order #: ${order.display_id || order.id}
            Customer: ${customerEmail}
            Date: ${new Date(order.created_at).toLocaleString()}
            Total: £${formattedOrder.total}
            
            Items:
            ${order.items ? order.items.map(item => `- ${item.title} (${item.quantity} x £${formatMoney(item.unit_price)})`).join('\n') : 'No items'}
            
            Shipping Address:
            ${shippingAddress.first_name || ''} ${shippingAddress.last_name || ''}
            ${shippingAddress.address_1 || ''}
            ${shippingAddress.city || ''}, ${shippingAddress.postal_code || ''}
            ${shippingAddress.country_code || ''}
          `
                };
                await mail_1.default.send(simpleMsg);
                console.log("✅ Admin notifier: Simple email sent successfully");
            }
            catch (simpleError) {
                console.error("❌ Admin notifier: Even simple email failed:", simpleError.message);
            }
        }
    }
    catch (error) {
        console.error("❌ Admin notifier: Unhandled error:", error);
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
// Listen for the same events as the order-placed subscriber
exports.config = {
    event: ['order.placed', 'LinkOrderCart.attached']
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tb3JkZXItbm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL2FkbWluLW9yZGVyLW5vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFvQkEsZ0RBc0tDO0FBekxELGtEQUF5QjtBQUN6QiwwREFBbUM7QUFFbkMsWUFBWTtBQUNaLE1BQU0sbUJBQW1CLEdBQUcscUVBQXFFLENBQUE7QUFDakcsTUFBTSxXQUFXLEdBQUcsNEJBQTRCLENBQUE7QUFFaEQsc0JBQXNCO0FBQ3RCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLGNBQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQTtBQUN4RCxDQUFDO0tBQU0sQ0FBQztJQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQTtBQUNqRSxDQUFDO0FBRUQ7OztHQUdHO0FBQ1ksS0FBSyxVQUFVLDZCQUE2QixDQUFDLEVBQzFELEtBQUssRUFDTCxTQUFTLEdBQ1c7O0lBQ3BCLElBQUksQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRS9ELHdEQUF3RDtRQUN4RCxNQUFNLFdBQVcsR0FBRyxDQUFDLGNBQWMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFBO1FBRTlELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQzFELE9BQU07UUFDUixDQUFDO1FBRUQsOEJBQThCO1FBQzlCLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUE7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFekYsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUE7WUFDeEQsT0FBTTtRQUNSLENBQUM7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQTtRQUNyQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSx1QkFBdUIsQ0FBQTtRQUVsRSwwRUFBMEU7UUFDMUUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLHdCQUF3QixFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsa0RBQWtELENBQUMsQ0FBQTtnQkFDL0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUM5QixHQUFHLE9BQU8sdUJBQXVCLEVBQ2pDO29CQUNFLE9BQU8sRUFBRTt3QkFDUCx1QkFBdUIsRUFBRSxtQkFBbUI7cUJBQzdDO2lCQUNGLENBQ0YsQ0FBQTtnQkFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDNUQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtvQkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsRUFBRSxPQUFPLENBQUMsQ0FBQTtnQkFDbEUsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQTtvQkFDekQsT0FBTTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxrREFBa0QsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ2hGLE9BQU07WUFDUixDQUFDO1FBQ0gsQ0FBQztRQUVELDBCQUEwQjtRQUMxQixJQUFJLEtBQUssQ0FBQTtRQUNULElBQUksQ0FBQztZQUNILHdFQUF3RTtZQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3RFLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FDOUIsR0FBRyxPQUFPLGlCQUFpQixPQUFPLEVBQUUsRUFDcEM7Z0JBQ0UsT0FBTyxFQUFFO29CQUNQLHVCQUF1QixFQUFFLG1CQUFtQjtpQkFDN0M7YUFDRixDQUNGLENBQUE7WUFFRCxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO1FBQ3ZFLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxrREFBa0QsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDaEYsT0FBTTtRQUNSLENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUE7WUFDbEQsT0FBTTtRQUNSLENBQUM7UUFFRCwrQ0FBK0M7UUFDL0MsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxtQkFBbUIsQ0FBQTtRQUN4RCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFBO1FBRXBELDRCQUE0QjtRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFO1lBQ3ZELEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztZQUNsQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDeEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO1lBQzFCLGNBQWMsRUFBRSxLQUFLLENBQUMsY0FBYztTQUNyQyxDQUFDLENBQUE7UUFFRixvQ0FBb0M7UUFDcEMsTUFBTSxjQUFjLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFcEQsNkJBQTZCO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLEVBQUU7WUFDeEQsS0FBSyxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzNCLFFBQVEsRUFBRSxjQUFjLENBQUMsUUFBUTtZQUNqQyxTQUFTLEVBQUUsY0FBYyxDQUFDLFNBQVM7WUFDbkMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxjQUFjO1NBQzlDLENBQUMsQ0FBQTtRQUVGLG9DQUFvQztRQUNwQyxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFBO1lBRXJHLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLFdBQVcsa0JBQWtCLFVBQVUsRUFBRSxDQUFDLENBQUE7WUFFN0YsTUFBTSxHQUFHLEdBQUc7Z0JBQ1YsRUFBRSxFQUFFLFdBQVc7Z0JBQ2YsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLDRCQUE0QjtnQkFDL0QsT0FBTyxFQUFFLGNBQWMsS0FBSyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsRUFBRSxTQUFTLGFBQWEsRUFBRTtnQkFDM0UsVUFBVTtnQkFDVixtQkFBbUIsRUFBRTtvQkFDbkIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLGVBQWU7b0JBQ2YsT0FBTyxFQUFFLGNBQWMsS0FBSyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFO29CQUNyRCxXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7aUJBQ3RDO2FBQ0YsQ0FBQTtZQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sY0FBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxFQUFFLE1BQUEsUUFBUSxDQUFDLENBQUMsQ0FBQywwQ0FBRSxVQUFVLENBQUMsQ0FBQTtRQUM1RixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsdURBQXVELEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRXJGLGtEQUFrRDtZQUNsRCxJQUFJLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0REFBNEQsQ0FBQyxDQUFBO2dCQUV6RSxNQUFNLFNBQVMsR0FBRztvQkFDaEIsRUFBRSxFQUFFLFdBQVc7b0JBQ2YsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLDRCQUE0QjtvQkFDL0QsT0FBTyxFQUFFLGNBQWMsS0FBSyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsRUFBRSxTQUFTLGFBQWEsRUFBRTtvQkFDM0UsSUFBSSxFQUFFOzs7dUJBR08sS0FBSyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsRUFBRTt3QkFDM0IsYUFBYTtvQkFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGNBQWMsRUFBRTtzQkFDekMsY0FBYyxDQUFDLEtBQUs7OztjQUc1QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUNyQyxLQUFLLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFFBQVEsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ3hFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVOzs7Y0FHdkIsZUFBZSxDQUFDLFVBQVUsSUFBSSxFQUFFLElBQUksZUFBZSxDQUFDLFNBQVMsSUFBSSxFQUFFO2NBQ25FLGVBQWUsQ0FBQyxTQUFTLElBQUksRUFBRTtjQUMvQixlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUUsS0FBSyxlQUFlLENBQUMsV0FBVyxJQUFJLEVBQUU7Y0FDaEUsZUFBZSxDQUFDLFlBQVksSUFBSSxFQUFFO1dBQ3JDO2lCQUNGLENBQUE7Z0JBRUQsTUFBTSxjQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7WUFDakUsQ0FBQztZQUFDLE9BQU8sV0FBVyxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ25GLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzVELENBQUM7QUFDSCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxLQUFLO0lBQ3hCLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDMUMsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLE1BQU0sUUFBUSxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFFdEUsb0RBQW9EO0lBQ3BELE9BQU8sQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3BDLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsc0JBQXNCLENBQUMsS0FBSztJQUNuQyx5QkFBeUI7SUFDekIsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7O1FBQUMsT0FBQSxDQUFDO1lBQzVELEdBQUcsSUFBSTtZQUNQLFVBQVUsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUN4QyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUEsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxLQUFLLEtBQUksRUFBRSxDQUFDO1lBQ2hELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUU7U0FDNUIsQ0FBQyxDQUFBO0tBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFUixvQ0FBb0M7SUFDcEMsT0FBTztRQUNMLEdBQUcsS0FBSztRQUNSLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ3hDLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMvQixRQUFRLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDckMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLGNBQWMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztRQUNqRCxjQUFjLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDO1FBQ3RELEtBQUssRUFBRSxjQUFjO0tBQ3RCLENBQUE7QUFDSCxDQUFDO0FBRUQsNERBQTREO0FBQy9DLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsQ0FBQyxjQUFjLEVBQUUsd0JBQXdCLENBQUM7Q0FDbEQsQ0FBQSJ9