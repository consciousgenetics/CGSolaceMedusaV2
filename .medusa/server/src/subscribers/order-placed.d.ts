import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
export default function placeOrder({ event: { data }, container, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
