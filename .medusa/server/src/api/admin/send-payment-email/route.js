"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Manual API endpoint to send payment captured email
 * Usage: POST /admin/send-payment-email
 * Body: { "payment_id": "pay_xxxxx" }
 */
async function POST(req, res) {
    var _a;
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
        // Get the order using the order_id from payment
        if (!basicPayment.order_id) {
            console.error("❌ Payment has no order_id:", basicPayment);
            return res.status(400).json({
                success: false,
                message: "Payment has no associated order"
            });
        }
        const orderQuery = (0, utils_1.remoteQueryObjectFromString)({
            entryPoint: "order",
            variables: {
                filters: {
                    id: basicPayment.order_id,
                },
            },
            fields: [
                "id",
                "display_id",
                "email",
                "currency_code",
                "total",
                "customer.*",
                "shipping_address.*",
                "billing_address.*",
                "items.*",
                "summary.*"
            ],
        });
        const [order] = await remoteQuery(orderQuery);
        if (!order) {
            console.error("❌ Order not found for payment:", basicPayment.order_id);
            return res.status(404).json({
                success: false,
                message: "Order not found for payment"
            });
        }
        console.log("📦 Order found:", order.display_id, "Customer:", (_a = order.customer) === null || _a === void 0 ? void 0 : _a.email);
        // Combine payment and order data
        const payment = {
            ...basicPayment,
            order: order
        };
        // Send email notification to customer
        console.log("📨 Attempting to send payment captured email...");
        await notificationModuleService.createNotifications({
            to: payment.order.customer.email,
            channel: "email",
            template: templateId,
            data: {
                emailOptions: {
                    subject: `Payment Received - Order #${payment.order.display_id}`,
                },
                order: {
                    ...payment.order,
                    summary: {
                        raw_current_order_total: {
                            value: payment.amount,
                        },
                    },
                },
                shippingAddress: payment.order.shipping_address,
                preview: "Your payment has been received!",
                currentYear: new Date().getFullYear(),
            },
        });
        console.log(`✅ Payment captured email sent for order ${payment.order.display_id} to ${payment.order.customer.email}`);
        return res.json({
            success: true,
            message: `Payment captured email sent to ${payment.order.customer.email}`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3NlbmQtcGF5bWVudC1lbWFpbC9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVlBLG9CQStJQztBQTFKRCxxREFJbUM7QUFFbkM7Ozs7R0FJRztBQUNJLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQTBDLEVBQzFDLEdBQW1COztJQUVuQixJQUFJLENBQUM7UUFDSCxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUVoQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLHdCQUF3QjthQUNsQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVoRSxxQ0FBcUM7UUFDckMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQztRQUM1RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO1lBQ3BGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLE9BQU8sRUFBRSwrQkFBK0I7YUFDekMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFakQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUM1QixNQUFNLHlCQUF5QixHQUFHLFNBQVMsQ0FBQyxP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