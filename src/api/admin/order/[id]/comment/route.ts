import { MedusaRequest, MedusaResponse } from "@medusajs/framework";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const {
    params: { id },
    scope: { resolve },
  } = req;

  // Get the query object from the Medusa container
  const query = resolve("query");

  // Retrieve the order with its associated cart
  const {
    data: [order],
  } = await query.graph({
    entity: "order",
    fields: ["cart.*"],
    filters: { id },
  });

  if (!order || !order.cart) {
    return res.status(404).json({ message: "Cart not found for this order." });
  }

  return res.status(200).json({ cart: order.cart });
}
