import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export async function POST(
  req: MedusaRequest<{ payment_id: string }>,
  res: MedusaResponse
) {
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
    const paymentModuleService = req.scope.resolve(Modules.PAYMENT);
    
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

  } catch (error) {
    console.error("❌ Test payment capture failed:", error);
    
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to capture payment",
      error: error
    });
  }
}