"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = metadataTransferHandler;
/**
 * This subscriber ensures that metadata from the cart is properly transferred to the order
 * Specifically focuses on saving customization comments
 */
async function metadataTransferHandler({ event, data, container, }) {
    try {
        console.log("🔄 Metadata Transfer: Processing event", event);
        // Only process cart.completed events
        if (event !== "cart.completed") {
            return;
        }
        console.log("🔄 Metadata Transfer: Cart completed event detected");
        // Get the order service to update the order
        const orderService = container.resolve("orderService");
        const cartService = container.resolve("cartService");
        // Extract the relevant data
        const { id: cartId, result } = data;
        if (!result || result.type !== "order" || !result.data || !result.data.id) {
            console.log("❌ Metadata Transfer: Invalid cart completion result", result);
            return;
        }
        const orderId = result.data.id;
        console.log(`🔄 Metadata Transfer: Cart ${cartId} converted to Order ${orderId}`);
        try {
            // Get the original cart to access its metadata
            const cart = await cartService.retrieve(cartId, {
                relations: ["items"]
            });
            if (!cart || !cart.metadata) {
                console.log("❌ Metadata Transfer: Cart or metadata not found", cartId);
                return;
            }
            console.log("🔍 Metadata Transfer: Cart metadata found", cart.metadata);
            // Check if there's customization data in the cart metadata
            if (cart.metadata.customization) {
                console.log("✅ Metadata Transfer: Customization found in cart metadata", cart.metadata.customization);
                // Update the order with the customization metadata
                await orderService.update(orderId, {
                    metadata: {
                        ...(result.data.metadata || {}),
                        customization: cart.metadata.customization
                    }
                });
                console.log("✅ Metadata Transfer: Order metadata updated successfully");
            }
            else {
                console.log("ℹ️ Metadata Transfer: No customization metadata found in cart");
            }
        }
        catch (err) {
            console.error("❌ Metadata Transfer: Error updating order metadata", err);
        }
    }
    catch (error) {
        console.error("❌ Metadata Transfer: Unhandled error", error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEtdHJhbnNmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbWV0YWRhdGEtdHJhbnNmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUEyQkEsMENBaUVDO0FBckVEOzs7R0FHRztBQUNZLEtBQUssVUFBVSx1QkFBdUIsQ0FBQyxFQUNwRCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFNBQVMsR0FDVztJQUNwQixJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRTVELHFDQUFxQztRQUNyQyxJQUFJLEtBQUssS0FBSyxnQkFBZ0IsRUFBRSxDQUFDO1lBQy9CLE9BQU07UUFDUixDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFBO1FBRWxFLDRDQUE0QztRQUM1QyxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFlLGNBQWMsQ0FBQyxDQUFBO1FBQ3BFLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQWMsYUFBYSxDQUFDLENBQUE7UUFFakUsNEJBQTRCO1FBQzVCLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUVuQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUMxRSxPQUFNO1FBQ1IsQ0FBQztRQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLE1BQU0sdUJBQXVCLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFFakYsSUFBSSxDQUFDO1lBQ0gsK0NBQStDO1lBQy9DLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQzlDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQixDQUFDLENBQUE7WUFFRixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxFQUFFLE1BQU0sQ0FBQyxDQUFBO2dCQUN0RSxPQUFNO1lBQ1IsQ0FBQztZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBRXZFLDJEQUEyRDtZQUMzRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkRBQTJELEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFFckcsbURBQW1EO2dCQUNuRCxNQUFNLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUNqQyxRQUFRLEVBQUU7d0JBQ1IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQzt3QkFDL0IsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTtxQkFDM0M7aUJBQ0YsQ0FBQyxDQUFBO2dCQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsMERBQTBELENBQUMsQ0FBQTtZQUN6RSxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQywrREFBK0QsQ0FBQyxDQUFBO1lBQzlFLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0RBQW9ELEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDMUUsQ0FBQztJQUNILENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0FBQ0gsQ0FBQyJ9