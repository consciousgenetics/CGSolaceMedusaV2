import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa';
export default function orderPlacedHandler({ event: { data }, container, }: SubscriberArgs<any>): Promise<void>;
export declare const config: SubscriberConfig;
