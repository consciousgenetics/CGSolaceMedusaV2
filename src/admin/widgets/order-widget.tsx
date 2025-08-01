import { useEffect, useState } from "react";
import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Text } from "@medusajs/ui";
import { AdminOrder, DetailWidgetProps } from "@medusajs/framework/types";

import { sdk } from "../lib/config"; // Adjust if your sdk file is named differently

interface CartResponse {
  cart: {
    metadata: {
      comment?: string;
    };
  };
  metadata: {
    comment?: string;
  };
}

const OrderWidget = ({ data }: DetailWidgetProps<AdminOrder>) => {
  const [comment, setComment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const cart = await sdk.client.fetch<CartResponse>(
          `/admin/order/${data.id}/comment`
        );

        setComment(
          cart.cart?.metadata?.comment || cart.metadata?.comment || null
        );
      } catch (err) {
        console.error("Failed to fetch comment:", err);
        setComment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchComment();
  }, [data.id]);

  return (
    <Container className="divide-y p-0">
      <div className="flex justify-between items-center px-6 py-4">
        <Heading level="h2">Order Items</Heading>
      </div>
      <div className="px-6 py-4">
        {data.items && data.items.length > 0 ? (
          <div className="space-y-4">
            {data.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded">
                {item.thumbnail && (
                  <img 
                    src={item.thumbnail} 
                    alt={item.product_title || item.title} 
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <Text className="font-semibold">
                    {item.product_title || item.title}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {item.variant_title}
                  </Text>
                  <Text className="text-sm">
                    Quantity: {item.quantity}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Text>No items found.</Text>
        )}
      </div>
      <div className="flex justify-between items-center px-6 py-4">
        <Heading level="h2">Order Comment</Heading>
      </div>
      <div className="px-6 py-4">
        {loading ? (
          <Text>Loading comment...</Text>
        ) : (
          <Text>{comment || "No comment found."}</Text>
        )}
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({ zone: "order.details.after" });
export default OrderWidget;
