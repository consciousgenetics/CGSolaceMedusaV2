"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Manual API endpoint to send payment captured email (store route - no auth required)
 * Usage: POST /store/send-payment-email
 * Body: { "payment_id": "pay_xxxxx" }
 */
async function POST(req, res) {
    var _a, _b;
    try {
        const { payment_id } = req.body;
        if (!payment_id) {
            return res.status(400).json({
                success: false,
                message: "payment_id is required"
            });
        }
        console.log("🔧 Manual payment email trigger for:", payment_id);
        // Check if template ID is configured
        const templateId = process.env.SENDGRID_PAYMENT_CAPTURED_ID;
        if (!templateId) {
            console.error("❌ SENDGRID_PAYMENT_CAPTURED_ID is not set in environment variables");
            return res.status(500).json({
                success: false,
                message: "Email template not configured"
            });
        }
        console.log("📧 Using template ID:", templateId);
        const container = req.scope;
        const notificationModuleService = container.resolve(utils_1.Modules.NOTIFICATION);
        // Get basic payment info
        const basicPaymentQuery = (0, utils_1.remoteQueryObjectFromString)({
            entryPoint: "payment",
            variables: {
                filters: {
                    id: payment_id,
                },
            },
            fields: ["id", "amount", "currency_code", "order_id", "captured_at", "payment_collection_id"],
        });
        const remoteQuery = container.resolve(utils_1.ContainerRegistrationKeys.REMOTE_QUERY);
        const [basicPayment] = await remoteQuery(basicPaymentQuery);
        console.log("💳 Basic payment info:", JSON.stringify(basicPayment, null, 2));
        if (!basicPayment) {
            console.error("❌ Payment not found:", payment_id);
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }
        // Get the order using the payment_collection_id
        if (!basicPayment.payment_collection_id) {
            console.error("❌ Payment has no payment_collection_id:", basicPayment);
            return res.status(400).json({
                success: false,
                message: "Payment has no associated payment collection"
            });
        }
        console.log("🔍 Looking for payment collection:", basicPayment.payment_collection_id);
        // First get the payment collection to find the order
        const paymentCollectionQuery = (0, utils_1.remoteQueryObjectFromString)({
            entryPoint: "payment_collection",
            variables: {
                filters: {
                    id: basicPayment.payment_collection_id,
                },
            },
            fields: ["id", "order_id", "order.*", "order.items.*"],
        });
        const [paymentCollection] = await remoteQuery(paymentCollectionQuery);
        if (!paymentCollection) {
            console.error("❌ Payment collection not found:", basicPayment.payment_collection_id);
            return res.status(404).json({
                success: false,
                message: "Payment collection not found"
            });
        }
        console.log("💰 Payment collection info:", JSON.stringify(paymentCollection, null, 2));
        // If order is included in payment collection, use it directly
        let order = paymentCollection.order;
        // If not, query for it using order_id
        if (!order && paymentCollection.order_id) {
            console.log("🔍 Querying order by ID:", paymentCollection.order_id);
            const orderQuery = (0, utils_1.remoteQueryObjectFromString)({
                entryPoint: "order",
                variables: {
                    filters: {
                        id: paymentCollection.order_id,
                    },
                },
                fields: [
                    "id",
                    "display_id",
                    "email",
                    "currency_code",
                    "total",
                    "subtotal",
                    "shipping_total",
                    "tax_total",
                    "discount_total",
                    "customer.*",
                    "shipping_address.*",
                    "billing_address.*",
                    "items.*",
                    "items.title",
                    "items.quantity",
                    "items.unit_price",
                    "summary.*"
                ],
            });
            const [queriedOrder] = await remoteQuery(orderQuery);
            order = queriedOrder;
        }
        if (!order) {
            console.error("❌ Order not found for payment collection:", basicPayment.payment_collection_id);
            return res.status(404).json({
                success: false,
                message: "Order not found for payment"
            });
        }
        console.log("📦 Order found:", order.display_id, "Customer:", (_a = order.customer) === null || _a === void 0 ? void 0 : _a.email);
        console.log("📋 Order items:", JSON.stringify(order.items, null, 2));
        // Combine payment and order data
        const payment = {
            ...basicPayment,
            order: order
        };
        // Send email notification to customer
        console.log("📨 Attempting to send payment captured email...");
        // Use order.email directly since customer object might not be loaded
        const customerEmail = ((_b = payment.order.customer) === null || _b === void 0 ? void 0 : _b.email) || payment.order.email;
        if (!customerEmail) {
            console.error("❌ No customer email found");
            return res.status(400).json({
                success: false,
                message: "No customer email found"
            });
        }
        console.log("📧 Sending to email:", customerEmail);
        // Get shipping address details
        let shippingAddress = null;
        if (payment.order.shipping_address_id) {
            const addressQuery = (0, utils_1.remoteQueryObjectFromString)({
                entryPoint: "address",
                variables: {
                    filters: {
                        id: payment.order.shipping_address_id,
                    },
                },
                fields: ["id", "first_name", "last_name", "address_1", "address_2", "city", "province", "postal_code", "country_code"],
            });
            const [address] = await remoteQuery(addressQuery);
            shippingAddress = address;
        }
        console.log("🏠 Shipping address:", JSON.stringify(shippingAddress, null, 2));
        // Prepare the data object that will be sent to SendGrid
        const emailData = {
            emailOptions: {
                subject: `Payment Received - Order #${payment.order.display_id}`,
            },
            order: {
                ...payment.order,
                customer: {
                    email: customerEmail, // Ensure customer email is available
                },
                summary: {
                    raw_current_order_total: {
                        value: payment.amount,
                    },
                },
                // Add currency symbol for template
                currency_symbol: payment.order.currency_code === 'USD' ? '$' : '£',
            },
            shippingAddress: shippingAddress || {
                first_name: "N/A",
                last_name: "",
                address_1: "Address not available",
                city: "",
                province: "",
                postal_code: "",
                country_code: ""
            },
            preview: "Your payment has been received!",
            currentYear: new Date().getFullYear(),
        };
        console.log("📤 Complete data being sent to SendGrid:", JSON.stringify(emailData, null, 2));
        await notificationModuleService.createNotifications({
            to: customerEmail,
            channel: "email",
            template: templateId,
            data: emailData,
        });
        console.log(`✅ Payment captured email sent for order ${payment.order.display_id} to ${customerEmail}`);
        return res.json({
            success: true,
            message: `Payment captured email sent to ${customerEmail}`,
            order_id: payment.order.display_id,
            payment_id: payment_id
        });
    }
    catch (error) {
        console.error("❌ Failed to send payment captured email manually:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send email",
            error: error.message
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3NlbmQtcGF5bWVudC1lbWFpbC9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVlBLG9CQTBPQztBQXJQRCxxREFJbUM7QUFFbkM7Ozs7R0FJRztBQUNJLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQTBDLEVBQzFDLEdBQW1COztJQUVuQixJQUFJLENBQUM7UUFDSCxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUVoQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLHdCQUF3QjthQUNsQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVoRSxxQ0FBcUM7UUFDckMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQztRQUM1RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO1lBQ3BGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLE9BQU8sRUFBRSwrQkFBK0I7YUFDekMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFakQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUM1QixNQUFNLHlCQUF5QixHQUFHLFNBQVMsQ0FBQyxP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