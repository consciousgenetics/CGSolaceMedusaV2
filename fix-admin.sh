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
      
      // Also patch XMLHttpRequest just in case
      const originalOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        if (typeof url === 'string' && url.includes('http://localhost:9000')) {
          url = url.replace('http://localhost:9000', '${backendUrl}');
          console.log('[URL Rewrite] Rewriting XHR URL to:', url);
        }
        return originalOpen.call(this, method, url, ...rest);
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

# Try to find admin HTML - check different possible locations
ADMIN_HTML_LOCATIONS=(
  ".medusa/server/public/admin/index.html"
  "dist/admin/index.html"
  "./.cache/admin/index.html"
  "build/admin/index.html"
)

FOUND_HTML=false

for ADMIN_HTML in "${ADMIN_HTML_LOCATIONS[@]}"; do
  echo "Checking for admin HTML at: $ADMIN_HTML"
  
  if [ -f "$ADMIN_HTML" ]; then
    echo "Found admin HTML at: $ADMIN_HTML"
    FOUND_HTML=true
    
    # Backup the original file
    cp "$ADMIN_HTML" "$ADMIN_HTML.bak"
    
    # Check if our script is already inserted
    if grep -q "/api/admin/fix-url" "$ADMIN_HTML"; then
      echo "Script already injected, skipping modification"
    else
      # Insert our script tag after the <head> tag
      if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS requires an empty string as the -i parameter
        sed -i '' '/<head>/a \
        <script>\
          // Inject our URL fixing script\
          const script = document.createElement("script");\
          script.src = "/api/admin/fix-url";\
          document.head.appendChild(script);\
        </script>' "$ADMIN_HTML"
      else
        # Linux
        sed -i '/<head>/a \
        <script>\
          // Inject our URL fixing script\
          const script = document.createElement("script");\
          script.src = "/api/admin/fix-url";\
          document.head.appendChild(script);\
        </script>' "$ADMIN_HTML"
      fi
      
      echo "✅ Patched admin panel HTML"
    fi
    
    # Break after finding the first valid HTML file
    break
  fi
done

if [ "$FOUND_HTML" = false ]; then
  echo "❌ Admin panel HTML file not found in any of the checked locations"
  echo "Please run 'yarn build' first to generate the admin panel files"
  exit 1
fi

echo "🚀 Fix complete! The admin panel should now work correctly when accessed through your domain." 