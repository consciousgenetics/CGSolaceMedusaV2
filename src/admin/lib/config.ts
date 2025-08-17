import Medusa from "@medusajs/js-sdk";

// Get the backend URL from the global window object or environment
const getBackendUrl = () => {
  // In production, the admin panel should use the same domain as the backend
  if (typeof window !== 'undefined') {
    // If running in browser, use current origin
    return window.location.origin;
  }
  // Fallback for server-side rendering or development
  return import.meta.env.VITE_BACKEND_URL || "/";
};

export const sdk = new Medusa({
  baseUrl: getBackendUrl(),
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
});
