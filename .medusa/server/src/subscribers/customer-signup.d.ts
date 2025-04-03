import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function customerSignupHandler({ event: { data }, container, }: SubscriberArgs<any>): Promise<void>;
export declare const config: SubscriberConfig;
