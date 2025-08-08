import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
export declare function POST(req: MedusaRequest<{
    payment_id?: string;
}>, res: MedusaResponse): Promise<MedusaResponse>;
