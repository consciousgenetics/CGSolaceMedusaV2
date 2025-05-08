type Container = {
    resolve: <T>(name: string) => T;
};
type SubscriberArgs<T = unknown> = {
    event: string;
    data: T;
    container: Container;
};
/**
 * This subscriber ensures that metadata from the cart is properly transferred to the order
 * Specifically focuses on saving customization comments
 */
export default function metadataTransferHandler({ event, data, container, }: SubscriberArgs<any>): Promise<void>;
export {};
