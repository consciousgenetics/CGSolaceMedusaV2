"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
const mail_1 = __importDefault(require("@sendgrid/mail"));
async function POST(req, res) {
    var _a, _b;
    try {
        console.log("🔴 Admin payment capture API called");
        const paymentId = req.params.id;
        if (!paymentId) {
            return res.status(400).json({
                success: false,
                message: "Payment ID is required"
            });
        }
        console.log("💳 Capturing payment:", paymentId);
        // Get the Payment Module service
        const paymentModuleService = req.scope.resolve(utils_1.Modules.PAYMENT);
        // Use the proper capturePayment method that should trigger workflows/events
        const payment = await paymentModuleService.capturePayment({
            payment_id: paymentId,
        });
        console.log("✅ Payment captured successfully:", payment.id);
        // Attempt to send the payment captured email immediately (in addition to subscriber)
        try {
            const templateId = process.env.SENDGRID_PAYMENT_CAPTURED_ID;
            if (!templateId) {
                console.error("❌ SENDGRID_PAYMENT_CAPTURED_ID is not set in environment variables");
            }
            else {
                const notificationModuleService = req.scope.resolve(utils_1.Modules.NOTIFICATION);
                const remoteQuery = req.scope.resolve(utils_1.ContainerRegistrationKeys.REMOTE_QUERY);
                // Fetch payment details to get payment_collection_id
                const basicPaymentQuery = (0, utils_1.remoteQueryObjectFromString)({
                    entryPoint: "payment",
                    variables: {
                        filters: { id: paymentId },
                    },
                    fields: ["id", "amount", "currency_code", "order_id", "captured_at", "payment_collection_id"],
                });
                const [basicPayment] = await remoteQuery(basicPaymentQuery);
                if (!basicPayment) {
                    console.error("❌ Payment not found when sending email:", paymentId);
                }
                else if (!basicPayment.payment_collection_id) {
                    console.error("❌ Payment has no payment_collection_id:", basicPayment);
                }
                else {
                    // Try to get the order from the payment collection
                    const paymentCollectionQuery = (0, utils_1.remoteQueryObjectFromString)({
                        entryPoint: "payment_collection",
                        variables: {
                            filters: { id: basicPayment.payment_collection_id },
                        },
                        fields: ["id", "order_id", "order.*", "order.items.*"],
                    });
                    const [paymentCollection] = await remoteQuery(paymentCollectionQuery);
                    let order = paymentCollection === null || paymentCollection === void 0 ? void 0 : paymentCollection.order;
                    if (!order && (paymentCollection === null || paymentCollection === void 0 ? void 0 : paymentCollection.order_id)) {
                        const orderQuery = (0, utils_1.remoteQueryObjectFromString)({
                            entryPoint: "order",
                            variables: {
                                filters: { id: paymentCollection.order_id },
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
                                "summary.*",
                            ],
                        });
                        const [queriedOrder] = await remoteQuery(orderQuery);
                        order = queriedOrder;
                    }
                    if (!order) {
                        console.error("❌ Order not found for payment collection:", basicPayment.payment_collection_id);
                    }
                    else {
                        const customerEmail = ((_a = order.customer) === null || _a === void 0 ? void 0 : _a.email) || order.email;
                        if (!customerEmail) {
                            console.error("❌ No customer email found for order:", order.id);
                        }
                        else {
                            console.log("📨 Attempting to send payment captured email (from capture route)...");
                            console.log("📧 Sending to email:", customerEmail);
                            // Prepare minimal email data; avoid hardcoding prices
                            const emailData = {
                                emailOptions: {
                                    subject: `Payment Received - Order #${order.display_id}`,
                                },
                                order: {
                                    ...order,
                                    customer: {
                                        email: customerEmail,
                                    },
                                    summary: {
                                        raw_current_order_total: {
                                            value: basicPayment.amount,
                                        },
                                    },
                                },
                                shippingAddress: order.shipping_address || undefined,
                                preview: "Your payment has been received!",
                                currentYear: new Date().getFullYear(),
                            };
                            // Prefer direct SendGrid send if configured, fallback to Notification module
                            const sendgridApiKey = process.env.SENDGRID_API_KEY;
                            const sendgridFrom = process.env.SENDGRID_FROM;
                            if (sendgridApiKey && sendgridFrom) {
                                try {
                                    mail_1.default.setApiKey(sendgridApiKey);
                                    const msg = {
                                        to: customerEmail,
                                        from: sendgridFrom,
                                        templateId: templateId,
                                        dynamicTemplateData: emailData,
                                    };
                                    const [sgRes] = await mail_1.default.send(msg);
                                    const messageId = (sgRes && sgRes.headers && sgRes.headers["x-message-id"]) || "unknown";
                                    console.log(`✅ Payment captured email sent via SendGrid (message-id: ${messageId}) for order ${order.display_id} to ${customerEmail}`);
                                }
                                catch (sgErr) {
                                    console.error("❌ Direct SendGrid send failed, falling back to Notification module:", ((_b = sgErr === null || sgErr === void 0 ? void 0 : sgErr.response) === null || _b === void 0 ? void 0 : _b.body) || sgErr);
                                    await notificationModuleService.createNotifications({
                                        to: customerEmail,
                                        channel: "email",
                                        template: templateId,
                                        data: emailData,
                                    });
                                    console.log(`✅ Payment captured email sent via Notification module for order ${order.display_id} to ${customerEmail}`);
                                }
                            }
                            else {
                                await notificationModuleService.createNotifications({
                                    to: customerEmail,
                                    channel: "email",
                                    template: templateId,
                                    data: emailData,
                                });
                                console.log(`✅ Payment captured email sent via Notification module for order ${order.display_id} to ${customerEmail}`);
                            }
                        }
                    }
                }
            }
        }
        catch (sendErr) {
            console.error("❌ Failed to send payment captured email after capture:", sendErr);
            // Do not fail the capture response due to email issues
        }
        return res.status(200).json({
            success: true,
            payment: payment,
            message: "Payment captured successfully",
        });
    }
    catch (error) {
        console.error("❌ Payment capture failed:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to capture payment",
            error: error
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3BheW1lbnRzL1tpZF0vY2FwdHVyZS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLG9CQXFMQztBQXhMRCxxREFBNEc7QUFDNUcsMERBQW9DO0FBRTdCLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQTJDLEVBQzNDLEdBQW1COztJQUVuQixJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFFbkQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLHdCQUF3QjthQUNsQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVoRCxpQ0FBaUM7UUFDakMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFaEUsNEVBQTRFO1FBQzVFLE1BQU0sT0FBTyxHQUFHLE1BQU0sb0JBQW9CLENBQUMsY0FBYyxDQUFDO1lBQ3hELFVBQVUsRUFBRSxTQUFTO1NBQ3RCLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTVELHFGQUFxRjtRQUNyRixJQUFJLENBQUM7WUFDSCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO1lBQzVELElB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