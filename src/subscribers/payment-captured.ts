import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  Modules,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";
import { EmailTemplates } from "../modules/email-notifications/templates";

export default async function paymentCapturedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);

  // Query to get payment details with related order
  const paymentFields = [
    "id",
    "amount",
    "currency_code",
    "order_id",
    "captured_at",
    "order.*",
    "order.customer.*",
    "order.shipping_address.*",
    "order.billing_address.*", 
    "order.items.*",
  ];

  const paymentQueryObject = remoteQueryObjectFromString({
    entryPoint: "payment",
    variables: {
      filters: {
        id: data.id,
      },
    },
    fields: paymentFields,
  });

  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const [payment] = await remoteQuery(paymentQueryObject);

  if (!payment || !payment.order) {
    console.error("Payment or order not found for payment capture notification");
    return;
  }

  const order = payment.order;

  // Send email notification to customer
  await notificationModuleService.createNotifications({
    to: order.customer.email,
    channel: "email",
    template: EmailTemplates.PAYMENT_CAPTURED,
    data: {
      emailOptions: {
        subject: `Payment Received - Order #${order.display_id}`,
      },
      order: {
        ...order,
        summary: {
          raw_current_order_total: {
            value: payment.amount,
          },
        },
      },
      shippingAddress: order.shipping_address,
      preview: "Your payment has been received!",
    },
  });

  console.log(`Payment captured email sent for order ${order.display_id} to ${order.customer.email}`);
}

export const config: SubscriberConfig = {
  event: "payment.captured",
};