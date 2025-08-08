import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
export default function paymentCapturedHandler({ event: { data }, container, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
