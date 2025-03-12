import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const backendUrl = process.env.MEDUSA_BACKEND_URL || 
    `${req.protocol}://${req.get("host")}`;
  
  // Create a script that will replace all instances of localhost:9000 with the correct URL
  const script = `
    (function() {
      // Only run in browser environment
      if (typeof window === 'undefined') return;

      // Original fetch function
      const originalFetch = window.fetch;
      
      // Override fetch to rewrite URLs
      window.fetch = function(resource, init) {
        if (typeof resource === 'string') {
          if (resource.includes('http://localhost:9000')) {
            resource = resource.replace('http://localhost:9000', '${backendUrl}');
            console.log('[URL Rewrite] Rewriting URL to:', resource);
          }
        }
        
        return originalFetch.call(this, resource, init);
      };
      
      // Periodically check for XHR and fetch in react components
      const observer = new MutationObserver(() => {
        setTimeout(() => {
          const links = document.querySelectorAll('a[href^="http://localhost:9000"]');
          links.forEach(link => {
            link.href = link.href.replace('http://localhost:9000', '${backendUrl}');
          });
        }, 1000);
      });
      
      // Start observing the document
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
      
      console.log('[URL Rewrite] Initialized: localhost:9000 → ${backendUrl}');
    })();
  `;
  
  // Set the correct content type and send the script
  res.setHeader('Content-Type', 'application/javascript');
  return res.send(script);
} 