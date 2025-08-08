import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
/**
 * Manual API endpoint to send payment captured email
 * Usage: POST /admin/send-payment-email
 * Body: { "payment_id": "pay_xxxxx" }
 */
export declare function POST(req: MedusaRequest<{
    payment_id: string;
}>, res: MedusaResponse): Promise<MedusaResponse>;
