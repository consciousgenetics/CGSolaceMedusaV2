import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";

export default async function debugAllEventsHandler({
  event,
  container,
}: SubscriberArgs<any>) {
  // Only log payment-related events to avoid spam
  if (
    event.name?.includes('payment') ||
    event.name?.includes('capture') ||
    event.name?.includes('fulfillment') ||
    event.name?.includes('shipment')
  ) {
    console.log("🎯 DEBUG - Event fired:", event.name);
    console.log("🎯 DEBUG - Event data:", JSON.stringify(event.data || {}, null, 2));
  }
}

export const config: SubscriberConfig = {
  event: "*", // Listen to ALL events
};