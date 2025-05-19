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
