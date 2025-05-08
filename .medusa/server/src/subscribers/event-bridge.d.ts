import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
/**
 * This subscriber acts as a bridge that converts LinkOrderCart.attached events into order.placed events.
 * Medusa's checkout flow is triggering LinkOrderCart events, but we want order.placed events for our email notifications.
 */
export default function eventBridgeHandler({ event, container, }: SubscriberArgs<any>): Promise<void>;
export declare const config: SubscriberConfig;
