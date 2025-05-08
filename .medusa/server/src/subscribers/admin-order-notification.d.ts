import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
/**
 * This subscriber handles sending order notifications to the admin email
 * It's separate from the customer notification to ensure reliability
 */
export default function adminOrderNotificationHandler({ event, container, }: SubscriberArgs<any>): Promise<void>;
export declare const config: SubscriberConfig;
