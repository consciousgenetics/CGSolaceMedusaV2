import * as React from 'react';
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types';
export declare const PAYMENT_CAPTURED = "payment-captured";
interface PaymentCapturedPreviewProps {
    order: OrderDTO & {
        display_id: string;
        currency_code: string;
        items: Array<{
            id: string;
            title: string;
            quantity: number;
            unit_price: number;
        }>;
        summary: {
            raw_current_order_total: {
                value: number;
            };
        };
    };
    shippingAddress?: OrderAddressDTO | null;
}
export interface PaymentCapturedTemplateProps {
    order: OrderDTO & {
        display_id: string;
        currency_code: string;
        items: Array<{
            id: string;
            title: string;
            quantity: number;
            unit_price: number;
        }>;
        summary: {
            raw_current_order_total: {
                value: number;
            };
        };
    };
    shippingAddress?: OrderAddressDTO | null;
    preview?: string;
}
export declare const isPaymentCapturedTemplateData: (data: any) => data is PaymentCapturedTemplateProps;
export declare const PaymentCapturedTemplate: React.FC<PaymentCapturedTemplateProps> & {
    PreviewProps: PaymentCapturedPreviewProps;
};
export default PaymentCapturedTemplate;
