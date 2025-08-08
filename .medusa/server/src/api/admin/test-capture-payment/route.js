"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
async function POST(req, res) {
    try {
        console.log("🧪 Test payment capture API called");
        const { payment_id } = req.body;
        if (!payment_id) {
            return res.status(400).json({
                success: false,
                message: "payment_id is required in request body"
            });
        }
        console.log("💳 Test capturing payment:", payment_id);
        // Get the Payment Module service
        const paymentModuleService = req.scope.resolve(utils_1.Modules.PAYMENT);
        // Use the proper capturePayment method that should trigger workflows/events
        const payment = await paymentModuleService.capturePayment({
            payment_id: payment_id,
        });
        console.log("✅ Test payment captured successfully:", payment.id);
        return res.status(200).json({
            success: true,
            payment: payment,
            message: "Payment captured successfully using proper Payment Module method"
        });
    }
    catch (error) {
        console.error("❌ Test payment capture failed:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to capture payment",
            error: error
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3Rlc3QtY2FwdHVyZS1wYXltZW50L3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esb0JBMENDO0FBNUNELHFEQUFvRDtBQUU3QyxLQUFLLFVBQVUsSUFBSSxDQUN4QixHQUEwQyxFQUMxQyxHQUFtQjtJQUVuQixJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFFbEQsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLE9BQU8sRUFBRSx3Q0FBd0M7YUFDbEQsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFdEQsaUNBQWlDO1FBQ2pDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWhFLDRFQUE0RTtRQUM1RSxNQUFNLE9BQU8sR0FBRyxNQUFNLG9CQUFvQixDQUFDLGNBQWMsQ0FBQztZQUN4RCxVQUFVLEVBQUUsVUFBVTtTQUN2QixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLE9BQU87WUFDaEIsT0FBTyxFQUFFLGtFQUFrRTtTQUM1RSxDQUFDLENBQUM7SUFFTCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdkQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxQixPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQywyQkFBMkI7WUFDN0UsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQyJ9