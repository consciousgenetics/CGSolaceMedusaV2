#!/bin/bash

# Script to fix Medusa admin panel URLs
# This patches the admin panel HTML to inject our URL rewriting script

echo "🔧 Fixing admin panel URLs..."

# Create the directory for our fix script if it doesn't exist
mkdir -p src/api/admin/fix-url

# Create the URL fix route
cat > src/api/admin/fix-url/route.ts << 'EOF'
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
EOF

echo "✅ Created fix-url API route"

# Wait for the build to complete
echo "⏳ Waiting for admin build to complete..."
sleep 10

# Path to the admin panel index.html
ADMIN_HTML=".medusa/server/public/admin/index.html"

# Check if the admin panel HTML exists
if [ -f "$ADMIN_HTML" ]; then
  # Backup the original file
  cp "$ADMIN_HTML" "$ADMIN_HTML.bak"
  
  # Insert our script tag after the <head> tag
  sed -i '/<head>/a \
    <script>\
      // Inject our URL fixing script\
      const script = document.createElement("script");\
      script.src = "/api/admin/fix-url";\
      document.head.appendChild(script);\
    </script>' "$ADMIN_HTML"
  
  echo "✅ Patched admin panel HTML"
else
  echo "❌ Admin panel HTML file not found at $ADMIN_HTML"
fi

echo "🚀 Fix complete! The admin panel should now work correctly." 