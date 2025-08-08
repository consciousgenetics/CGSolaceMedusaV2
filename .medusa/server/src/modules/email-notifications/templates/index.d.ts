import { ReactNode } from 'react';
import { InviteUserEmail } from './invite-user';
import { OrderPlacedTemplate } from './order-placed';
import { PaymentCapturedTemplate } from './payment-captured';
export declare const EmailTemplates: {
    readonly INVITE_USER: "invite-user";
    readonly ORDER_PLACED: "order-placed";
    readonly ORDER_CANCELLED: "order-cancelled";
    readonly PAYMENT_CAPTURED: "payment-captured";
};
export type EmailTemplateType = keyof typeof EmailTemplates;
export declare function generateEmailTemplate(templateKey: string, data: unknown): ReactNode;
export { InviteUserEmail, OrderPlacedTemplate, PaymentCapturedTemplate };
