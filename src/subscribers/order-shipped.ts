import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function fulfillmentShippedHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  try {
    console.log("🚚 Fulfillment/Shipment event received:", event.name, "Data:", JSON.stringify(event.data || {}, null, 2))

    const notificationModuleService = container.resolve(Modules.NOTIFICATION)
    const query = container.resolve("query")

    let orderId: string | undefined

    // Handle different event types
    if (event.name === "shipment.created") {
      // For shipment.created, the ID is the fulfillment ID
      // We need to find the order that contains this fulfillment
      const fulfillmentId = event.data?.id
      if (!fulfillmentId) {
        console.error("❌ No fulfillment ID in event data")
        return
      }
      
      console.log("ℹ️ Looking for order containing fulfillment:", fulfillmentId)
      
      // Get all orders with fulfillments to find the matching one
      const { data: orders } = await query.graph({
        entity: "order",
        fields: ["id", "display_id", "fulfillments.*"],
        filters: {},
      })
      
      // Find the order that contains this fulfillment
      const matchingOrder = orders?.find((order: any) => 
        order.fulfillments?.some((f: any) => f.id === fulfillmentId)
      )
      
      if (!matchingOrder) {
        console.error("❌ No order found containing fulfillment:", fulfillmentId)
        return
      }
      
      console.log("ℹ️ Found matching order:", matchingOrder.id)
      orderId = matchingOrder.id
      
    } else if (event.name === "fulfillment.fulfillment-label.created") {
      // For label created, skip the label query and just get all fulfillments to find one with labels
      const labelId = event.data?.id
      if (!labelId) {
        console.error("❌ No label ID in event data")
        return
      }
      
      console.log("ℹ️ Looking for order containing label:", labelId)
      
      // Get all orders with fulfillments and labels to find the matching one
      const { data: orders } = await query.graph({
        entity: "order",
        fields: ["id", "display_id", "fulfillments.*", "fulfillments.labels.*"],
        filters: {},
      })
      
      // Find the order that has a fulfillment containing this label
      const matchingOrder = orders?.find((order: any) => 
        order.fulfillments?.some((f: any) => 
          f.labels?.some((label: any) => label.id === labelId)
        )
      )
      
      if (!matchingOrder) {
        console.error("❌ No order found containing label:", labelId)
        return
      }
      
      console.log("ℹ️ Found matching order:", matchingOrder.id)
      orderId = matchingOrder.id
    } else {
      // Direct order ID from event data
      orderId = event.data?.id
    }

    if (!orderId) {
      console.error("❌ Could not determine order ID from event")
      return
    }

    console.log("ℹ️ Determined order ID:", orderId)

    // Retrieve order details with all necessary fields for the template
    const { data: [order] } = await query.graph({
      entity: "order",
      fields: [
        "id", 
        "email", 
        "display_id", 
        "shipping_address.*", 
        "customer.*",
        "items.*",
        "items.product_title",
        "items.variant_title", 
        "items.title",
        "items.quantity",
        "fulfillments.*",
        "fulfillments.labels.*"
      ],
      filters: { id: orderId },
    })

    if (!order) {
      console.error("❌ Order not found for ID:", orderId)
      return
    }

    // Debug: log order structure to help with template variables
    console.log("🔍 Order data structure:")
    console.log("  - display_id:", order.display_id)
    console.log("  - email:", order.email)
    console.log("  - customer:", order.customer ? "present" : "missing")
    console.log("  - items count:", order.items?.length || 0)
    console.log("  - fulfillments count:", order.fulfillments?.length || 0)
    console.log("  - shipping_address:", order.shipping_address ? "present" : "missing")
    if (order.items?.length > 0) {
      console.log("  - sample item fields:", Object.keys(order.items[0]))
    }

    const customerEmail = order.customer?.email || order.email
    if (!customerEmail) {
      console.error("❌ No customer email found for order:", order.id)
      return
    }

    // Extract tracking information from fulfillments
    const allLabels = order.fulfillments?.flatMap((f: any) => f.labels || []) || []
    const trackingLabel = allLabels.find((label: any) => label.tracking_number) || allLabels[0]
    const tracking_number = trackingLabel?.tracking_number
    const trackingUrl = tracking_number 
      ? `https://www.royalmail.com/track-your-item#/tracking-results/${encodeURIComponent(tracking_number)}`
      : undefined

    console.log("📧 Sending shipped email to:", customerEmail, "for order:", order.display_id)
    console.log("📦 Tracking number:", tracking_number || "None found")

    const templateId = process.env.SENDGRID_ORDER_SHIPPED_ID
    if (!templateId) {
      console.error("❌ SENDGRID_ORDER_SHIPPED_ID is not set in environment variables")
      return
    }

    // Structure data exactly as the template expects
    await notificationModuleService.createNotifications({
      to: customerEmail,
      channel: "email",
      template: templateId,
      data: {
        emailOptions: {
          subject: `Your order #${order.display_id} has shipped`,
        },
        order: {
          ...order,
          items: order.items || []
        },
        shippingAddress: order.shipping_address || {},
        tracking_number: tracking_number,
        trackingUrl: trackingUrl,
        preview: "Your order is on its way!",
        currentYear: new Date().getFullYear(),
      },
    })

    console.log(`✅ Shipped email sent for order ${order.display_id} to ${customerEmail}`)
  } catch (e) {
    console.error("❌ Failed to send shipped email:", e)
    throw e
  }
}

export const config: SubscriberConfig = {
  // Try the events we know exist from the documentation and logs
  event: ["shipment.created", "fulfillment.fulfillment-label.created"],
}

