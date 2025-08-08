"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const axios_1 = __importDefault(require("axios"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
}
// The known publishable API key
const PUBLISHABLE_API_KEY = 'pk_c3c8c1abbad751cfb6af3bb255ccdff31133489617e2164a8dad770c7e9f8c8c';
async function GET(req, res) {
    try {
        const orderId = req.query.orderId;
        if (!orderId) {
            res.status(400).json({
                success: false,
                message: "Missing orderId parameter"
            });
            return;
        }
        // Fetch order data from the store API
        let order;
        const baseUrl = process.env.BACKEND_URL || 'http://localhost:9000';
        try {
            const response = await axios_1.default.get(`${baseUrl}/store/orders/${orderId}`, {
                headers: {
                    'x-publishable-api-key': PUBLISHABLE_API_KEY
                }
            });
            order = response.data.order;
            console.log('Order fetched successfully');
        }
        catch (error) {
            res.status(404).json({
                success: false,
                message: "Order not found",
                error: error.message
            });
            return;
        }
        if (!order || !order.email) {
            res.status(404).json({
                success: false,
                message: "Order not found or missing email"
            });
            return;
        }
        // Use the order data directly
        const shippingAddress = order.shipping_address || {};
        // Create enriched order object
        const enrichedOrder = { ...order };
        // Send email directly via SendGrid
        const msg = {
            subject: "Conscious Genetics Order Submitted",
            to: order.email,
            from: process.env.SENDGRID_FROM || 'info@consciousgenetics.com',
            templateId: process.env.SENDGRID_ORDER_PLACED_ID,
            dynamicTemplateData: {
                order: enrichedOrder,
                shippingAddress,
                preview: 'Thank you for your order!',
                subject: "Conscious Genetics Order Submitted"
            },
            categories: ['order-confirmation'],
            customArgs: {
                subject: "Conscious Genetics Order Submitted"
            }
        };
        await mail_1.default.send(msg);
        res.json({
            success: true,
            message: `Order confirmation email sent to ${order.email}`
        });
    }
    catch (error) {
        console.error('Error sending order confirmation email:', error);
        res.status(500).json({
            success: false,
            message: "Failed to send email",
            error: error.message
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3NlbmQtb3JkZXItZW1haWwvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFhQSxrQkFxRkM7QUFoR0Qsa0RBQTBCO0FBQzFCLDBEQUFvQztBQUVwQyxzQkFBc0I7QUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDakMsY0FBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELGdDQUFnQztBQUNoQyxNQUFNLG1CQUFtQixHQUFHLHFFQUFxRSxDQUFDO0FBRTNGLEtBQUssVUFBVSxHQUFHLENBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLElBQUksQ0FBQztRQUNILE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBaUIsQ0FBQztRQUU1QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDYixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLDJCQUEyQjthQUNyQyxDQUFDLENBQUM7WUFDSCxPQUFPO1FBQ1QsQ0FBQztRQUVELHNDQUFzQztRQUN0QyxJQUFJLEtBQUssQ0FBQztRQUNWLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLHVCQUF1QixDQUFDO1FBRW5FLElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FDOUIsR0FBRyxPQUFPLGlCQUFpQixPQUFPLEVBQUUsRUFDcEM7Z0JBQ0UsT0FBTyxFQUFFO29CQUNQLHVCQUF1QixFQUFFLG1CQUFtQjtpQkFDN0M7YUFDRixDQUNGLENBQUM7WUFDRixLQUFLLEdBQUksUUFBUSxDQUFDLElBQXVCLENBQUMsS0FBSyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDckIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUsa0NBQWtDO2FBQzVDLENBQUMsQ0FBQztZQUNILE9BQU87UUFDVCxDQUFDO1FBRUQsOEJBQThCO1FBQzlCLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7UUFFckQsK0JBQStCO1FBQy9CLE1BQU0sYUFBYSxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQztRQUVuQyxtQ0FBbUM7UUFDbkMsTUFBTSxHQUFHLEdBQUc7WUFDVixPQUFPLEVBQUUsb0NBQW9DO1lBQzdDLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSztZQUNmLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSw0QkFBNEI7WUFDL0QsVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCO1lBQ2hELG1CQUFtQixFQUFFO2dCQUNuQixLQUFLLEVBQUUsYUFBYTtnQkFDcEIsZUFBZTtnQkFDZixPQUFPLEVBQUUsMkJBQTJCO2dCQUNwQyxPQUFPLEVBQUUsb0NBQW9DO2FBQzlDO1lBQ0QsVUFBVSxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDbEMsVUFBVSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxvQ0FBb0M7YUFDOUM7U0FDRixDQUFDO1FBRUYsTUFBTSxjQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDUCxPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSxvQ0FBb0MsS0FBSyxDQUFDLEtBQUssRUFBRTtTQUMzRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMseUNBQXlDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTztTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQyJ9