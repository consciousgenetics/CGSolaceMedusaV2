"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
async function GET(req, res) {
    const { params: { id }, scope: { resolve }, } = req;
    // Get the query object from the Medusa container
    const query = resolve("query");
    // Retrieve the order with its associated cart
    const { data: [order], } = await query.graph({
        entity: "order",
        fields: ["cart.*"],
        filters: { id },
    });
    if (!order || !order.cart) {
        return res.status(404).json({ message: "Cart not found for this order." });
    }
    return res.status(200).json({ cart: order.cart });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL29yZGVyL1tpZF0vY29tbWVudC9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQXVCQztBQXZCTSxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxFQUNKLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNkLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUNuQixHQUFHLEdBQUcsQ0FBQztJQUVSLGlEQUFpRDtJQUNqRCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFL0IsOENBQThDO0lBQzlDLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FDZCxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsT0FBTztRQUNmLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNsQixPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUU7S0FDaEIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNwRCxDQUFDIn0=