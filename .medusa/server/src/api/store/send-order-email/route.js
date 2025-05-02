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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3NlbmQtb3JkZXItZW1haWwvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFhQSxrQkErRUM7QUExRkQsa0RBQTBCO0FBQzFCLDBEQUFvQztBQUVwQyxzQkFBc0I7QUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDakMsY0FBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELGdDQUFnQztBQUNoQyxNQUFNLG1CQUFtQixHQUFHLHFFQUFxRSxDQUFDO0FBRTNGLEtBQUssVUFBVSxHQUFHLENBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLElBQUksQ0FBQztRQUNILE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBaUIsQ0FBQztRQUU1QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDYixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLDJCQUEyQjthQUNyQyxDQUFDLENBQUM7WUFDSCxPQUFPO1FBQ1QsQ0FBQztRQUVELHNDQUFzQztRQUN0QyxJQUFJLEtBQUssQ0FBQztRQUNWLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLHVCQUF1QixDQUFDO1FBRW5FLElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FDOUIsR0FBRyxPQUFPLGlCQUFpQixPQUFPLEVBQUUsRUFDcEM7Z0JBQ0UsT0FBTyxFQUFFO29CQUNQLHVCQUF1QixFQUFFLG1CQUFtQjtpQkFDN0M7YUFDRixDQUNGLENBQUM7WUFDRixLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxLQUFLO2dCQUNkLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTzthQUNyQixDQUFDLENBQUM7WUFDSCxPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxLQUFLO2dCQUNkLE9BQU8sRUFBRSxrQ0FBa0M7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTztRQUNULENBQUM7UUFFRCw4QkFBOEI7UUFDOUIsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztRQUVyRCwrQkFBK0I7UUFDL0IsTUFBTSxhQUFhLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO1FBRW5DLG1DQUFtQztRQUNuQyxNQUFNLEdBQUcsR0FBRztZQUNWLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSztZQUNmLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSw0QkFBNEI7WUFDL0QsVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCO1lBQ2hELG1CQUFtQixFQUFFO2dCQUNuQixLQUFLLEVBQUUsYUFBYTtnQkFDcEIsZUFBZTtnQkFDZixPQUFPLEVBQUUsMkJBQTJCO2FBQ3JDO1NBQ0YsQ0FBQztRQUVGLE1BQU0sY0FBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2QixHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1AsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsb0NBQW9DLEtBQUssQ0FBQyxLQUFLLEVBQUU7U0FDM0QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE9BQU8sRUFBRSxLQUFLO1lBQ2QsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU87U0FDckIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUMifQ==