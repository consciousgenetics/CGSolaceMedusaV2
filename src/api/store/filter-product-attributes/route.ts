import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ProductService } from "@medusajs/medusa";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const productService: ProductService = req.scope.resolve("productService");
  
  try {
    // Get all products to extract the product attributes
    const products = await productService.list({}, {
      relations: ["collection", "type", "tags"],
      select: ["id", "collection_id", "type_id", "tags", "metadata"],
    });

    // Extract unique collections, types, and materials from products
    const collections = new Map();
    const types = new Map();
    const materials = new Map();

    // Process each product to extract attributes
    products.forEach(product => {
      // Handle collection
      if (product.collection) {
        collections.set(product.collection.id, {
          id: product.collection.id,
          value: product.collection.title || product.collection.handle,
        });
      }

      // Handle type
      if (product.type) {
        types.set(product.type.id, {
          id: product.type.id,
          value: product.type.value,
        });
      }

      // Handle materials from metadata (if available)
      if (product.metadata && product.metadata.material) {
        const material = product.metadata.material;
        materials.set(material, {
          id: material,
          value: material,
        });
      }
    });

    // Convert maps to arrays
    const response = {
      collections: Array.from(collections.values()),
      types: Array.from(types.values()),
      materials: Array.from(materials.values()),
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching product attributes:", error);
    res.status(500).json({ 
      message: "Failed to fetch product attributes", 
      error: error.message 
    });
  }
} 