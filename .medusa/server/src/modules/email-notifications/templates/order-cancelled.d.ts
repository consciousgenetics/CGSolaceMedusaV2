import * as React from 'react';
import { OrderDTO, OrderLineItemDTO } from '@medusajs/framework/types';
export declare const ORDER_CANCELLED = "order-cancelled";
interface OrderCancelledPreviewProps {
    order: OrderDTO & {
        display_id: string;
        canceled_at: string;
        payment_status: string;
        items: Array<OrderLineItemDTO & {
            title: string;
            product_title?: string;
            unit_price: number;
        }>;
        discount_total: number;
        currency_code: string;
    };
    customer: {
        first_name: string;
        last_name: string;
    };
    order_link: string;
}
export interface OrderCancelledTemplateProps {
    order: OrderDTO & {
        display_id: string;
        canceled_at: string;
        payment_status: string;
        items: Array<OrderLineItemDTO & {
            title: string;
            product_title?: string;
            unit_price: number;
        }>;
        discount_total: number;
        currency_code: string;
    };
    customer: {
        first_name: string;
        last_name: string;
    };
    order_link: string;
    preview?: string;
}
export declare const isOrderCancelledTemplateData: (data: any) => data is OrderCancelledTemplateProps;
export declare const OrderCancelledTemplate: React.FC<OrderCancelledTemplateProps> & {
    PreviewProps: OrderCancelledPreviewProps;
};
export default OrderCancelledTemplate;
