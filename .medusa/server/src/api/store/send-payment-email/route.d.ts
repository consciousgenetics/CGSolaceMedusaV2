import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
/**
 * Manual API endpoint to send payment captured email (store route - no auth required)
 * Usage: POST /store/send-payment-email
 * Body: { "payment_id": "pay_xxxxx" }
 */
export declare function POST(req: MedusaRequest<{
    payment_id: string;
}>, res: MedusaResponse): Promise<MedusaResponse>;
