import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import axios from "axios";

export async function ALL(
  req: MedusaRequest,
  res: MedusaResponse
) {
  // Get the actual path the client is requesting
  const path = req.path.replace("/api/admin/proxy", "");
  
  // Get the backend URL from environment or use the current host
  const backendUrl = process.env.MEDUSA_BACKEND_URL || 
    `${req.protocol}://${req.get("host")}`;
  
  try {
    // Forward the request to the actual backend
    const response = await axios({
      method: req.method,
      url: `${backendUrl}${path}`,
      data: req.body,
      headers: {
        ...req.headers,
        host: new URL(backendUrl).host, // Replace host header
      },
      validateStatus: () => true, // Don't throw on error status codes
    });
    
    // Forward the response back to the client
    res.status(response.status);
    
    // Set headers
    Object.entries(response.headers).forEach(([key, value]) => {
      res.set(key, value as string);
    });
    
    // Send the response body
    return res.send(response.data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Proxy error", details: error.message });
  }
} 