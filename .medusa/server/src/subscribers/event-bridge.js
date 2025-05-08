"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = eventBridgeHandler;
const axios_1 = __importDefault(require("axios"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
/**
 * This subscriber acts as a bridge that converts LinkOrderCart.attached events into order.placed events.
 * Medusa's checkout flow is triggering LinkOrderCart events, but we want order.placed events for our email notifications.
 */
async function eventBridgeHandler({ event, container, }) {
    try {
        console.log("🌉 Event bridge received:", event.name);
        // Only intercept LinkOrderCart.attached events
        if (event.name !== "LinkOrderCart.attached") {
            return;
        }
        const { data } = event;
        console.log("🔄 Processing bridge for LinkOrderCart:", JSON.stringify(data, null, 2));
        if (!data || !data.id) {
            console.error("❌ Invalid data received in event bridge");
            return;
        }
        // Get API base URL and tokens
        const baseUrl = process.env.BACKEND_URL || "http://localhost:9000";
        const publishableKey = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c';
        // Extract cart ID from the event payload or from the ordercart_id directly
        const cartId = extractCartId(data.id);
        if (!cartId) {
            console.error("❌ Could not extract cart ID from event data");
            // Still try to send emails directly using recent order logic as fallback
            await sendDirectEmailsUsingRecentOrder(baseUrl, publishableKey, container);
            return;
        }
        console.log("🛒 Extracted cart ID:", cartId);
        // Try to get the order directly from the store API using the cart ID
        try {
            console.log("🔍 Attempting to fetch order using cart ID...");
            // Note: There's no direct cart->order API in Medusa, so we'll fetch recent orders
            // and look for one associated with this cart
            // We'll directly try to send emails using the most recent order
            await sendDirectEmailsUsingRecentOrder(baseUrl, publishableKey, container);
            // Additionally, try to emit an order.placed event
            try {
                // Try to get the most recent order to use its ID
                const ordersResponse = await axios_1.default.get(`${baseUrl}/store/orders?limit=1`, {
                    headers: {
                        "x-publishable-api-key": publishableKey
                    }
                });
                if (ordersResponse.data.orders && ordersResponse.data.orders.length > 0) {
                    const recentOrder = ordersResponse.data.orders[0];
                    const orderId = recentOrder.id;
                    console.log(`🚀 Emitting order.placed for recent order ${orderId}`);
                    // Get the event bus service
                    const eventBusService = container.resolve("eventBusService");
                    // Emit the order.placed event with the order ID
                    // @ts-ignore - Ignore TypeScript error for eventBusService not having emit method
                    await eventBusService.emit("order.placed", { id: orderId });
                    console.log("✅ Successfully emitted order.placed event");
                }
            }
            catch (eventError) {
                console.error("❌ Failed to emit order.placed event:", eventError.message);
                // Already tried sending emails directly, no need for further action
            }
        }
        catch (error) {
            console.error("❌ Failed while handling cart:", error.message);
            // Already tried fallback approach with recent orders
        }
    }
    catch (error) {
        console.error("❌ Unhandled error in event bridge:", error);
    }
}
/**
 * Extract cart ID from ordercart_id or other formats
 */
function extractCartId(id) {
    try {
        // Sample format: "ordercart_01JT7TX7KZVQXZDD0G8Y649G66"
        if (id.startsWith("ordercart_")) {
            // We don't have a direct way to get the cart ID from ordercart_id
            // This is a limitation of Medusa's API
            return null;
        }
        return id;
    }
    catch (error) {
        console.error("❌ Error extracting cart ID:", error);
        return null;
    }
}
/**
 * Format monetary values properly from cents to dollars/pounds
 * Medusa stores prices in cents/pennies by default
 */
function formatMoney(value) {
    if (value === null || value === undefined) {
        return "0.00";
    }
    // Make sure we're working with a number
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    // Check if this value is likely already in dollars/pounds format
    // Most Medusa values are in cents, so they'll be much larger numbers
    if (numValue < 100 && Number.isInteger(numValue)) {
        // This might already be in dollars/pounds, log a warning
        console.warn(`⚠️ Price value ${numValue} seems suspiciously low, might already be in dollars/pounds`);
    }
    // Divide by 100 to convert from cents to dollars/pounds
    // Ensure we get 2 decimal places with toFixed(2)
    return (numValue / 100).toFixed(2);
}
/**
 * Send emails directly without relying on event handlers, using recent order approach
 */
async function sendDirectEmailsUsingRecentOrder(baseUrl, publishableKey, container) {
    try {
        if (!process.env.SENDGRID_API_KEY) {
            console.error("❌ SendGrid API key not set!");
            return;
        }
        // Initialize SendGrid
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
        console.log("🔍 Fetching most recent order from store API...");
        // Get the most recent order
        try {
            const response = await axios_1.default.get(`${baseUrl}/store/orders?limit=1`, {
                headers: {
                    "x-publishable-api-key": publishableKey
                }
            });
            if (!response.data.orders || response.data.orders.length === 0) {
                console.error("❌ No recent orders found in store API");
                return;
            }
            const order = response.data.orders[0];
            console.log("✅ Found recent order ID:", order.id);
            // Extract customer email
            const customerEmail = order.email;
            if (!customerEmail) {
                console.error("❌ Order is missing customer email");
                return;
            }
            // Log original values for debugging
            console.log("💰 Original price values:", {
                subtotal: order.subtotal,
                tax_total: order.tax_total,
                shipping_total: order.shipping_total,
                discount_total: order.discount_total,
                total: order.total
            });
            // Prepare order data for templates
            const orderData = {
                ...order,
                display_id: order.display_id || order.id,
                // Format monetary values
                total: formatMoney(order.total),
                subtotal: formatMoney(order.subtotal),
                tax_total: formatMoney(order.tax_total),
                shipping_total: formatMoney(order.shipping_total),
                discount_total: formatMoney(order.discount_total),
                items: order.items ? order.items.map(item => {
                    var _a;
                    const formattedPrice = formatMoney(item.unit_price);
                    return {
                        ...item,
                        unit_price: formattedPrice,
                        title: item.title || (((_a = item.variant) === null || _a === void 0 ? void 0 : _a.title) || ''),
                        variant: item.variant || {}
                    };
                }) : []
            };
            // Log formatted values for debugging
            console.log("💰 Formatted price values:", {
                subtotal: orderData.subtotal,
                tax_total: orderData.tax_total,
                shipping_total: orderData.shipping_total,
                discount_total: orderData.discount_total,
                total: orderData.total
            });
            const shippingAddress = order.shipping_address || {};
            console.log("📧 Order details for notifications:", {
                id: order.id,
                display_id: order.display_id,
                email: order.email,
                total: orderData.total // Use formatted total
            });
            // Send customer email
            try {
                const customerMsg = {
                    to: customerEmail,
                    from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
                    subject: 'Your order has been placed',
                    templateId: process.env.SENDGRID_ORDER_PLACED_ID,
                    dynamicTemplateData: {
                        order: orderData,
                        shippingAddress,
                        preview: 'Thank you for your order!'
                    }
                };
                await mail_1.default.send(customerMsg);
                console.log("✅ Direct customer email sent to:", customerEmail);
            }
            catch (customerError) {
                console.error("❌ Failed to send direct customer email:", customerError);
            }
            // Send admin email
            try {
                const adminEmail = 'info@consciousgenetics.com';
                const adminMsg = {
                    to: adminEmail,
                    from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
                    subject: `New Order #${order.display_id || order.id} from ${customerEmail}`,
                    templateId: process.env.SENDGRID_ADMIN_NOTIFICATION_ID || process.env.SENDGRID_ORDER_PLACED_ID,
                    dynamicTemplateData: {
                        order: orderData,
                        shippingAddress,
                        preview: `New Order #${order.display_id || order.id}`,
                        currentYear: new Date().getFullYear()
                    }
                };
                await mail_1.default.send(adminMsg);
                console.log("✅ Direct admin email sent to:", adminEmail);
            }
            catch (adminError) {
                console.error("❌ Failed to send direct admin email:", adminError);
                // Try simple text email as last resort
                try {
                    const simpleMsg = {
                        to: 'info@consciousgenetics.com',
                        from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
                        subject: `New Order #${order.display_id || order.id} from ${customerEmail}`,
                        text: `A new order #${order.display_id || order.id} has been placed by ${customerEmail} for a total of £${orderData.total}.`
                    };
                    await mail_1.default.send(simpleMsg);
                    console.log("✅ Simple admin notification sent as fallback");
                }
                catch (simpleError) {
                    console.error("❌ Even simple admin email failed:", simpleError);
                }
            }
        }
        catch (error) {
            console.error("❌ Failed to fetch recent orders:", error.message);
        }
    }
    catch (error) {
        console.error("❌ Error in direct email sending:", error);
    }
}
// This subscriber should be called BEFORE other subscribers to ensure they receive the order.placed event
exports.config = {
    event: ["LinkOrderCart.attached"]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtYnJpZGdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL2V2ZW50LWJyaWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFRQSxxQ0FtRkM7QUExRkQsa0RBQXlCO0FBQ3pCLDBEQUFtQztBQUVuQzs7O0dBR0c7QUFDWSxLQUFLLFVBQVUsa0JBQWtCLENBQUMsRUFDL0MsS0FBSyxFQUNMLFNBQVMsR0FDVztJQUNwQixJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVwRCwrQ0FBK0M7UUFDL0MsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLHdCQUF3QixFQUFFLENBQUM7WUFDNUMsT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFBO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFckYsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUE7WUFDeEQsT0FBTTtRQUNSLENBQUM7UUFFRCw4QkFBOEI7UUFDOUIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksdUJBQXVCLENBQUE7UUFDbEUsTUFBTSxjQUFjLEdBQUcscUVBQXFFLENBQUE7UUFFNUYsMkVBQTJFO1FBQzNFLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyw2Q0FB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