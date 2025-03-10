#!/bin/bash
set -e

# Print system information
echo "System information:"
echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Operating system: $(uname -a)"

# Check for required environment variables
echo "Checking environment variables..."
required_vars=(
  "DATABASE_URL"
  "STORE_CORS"
  "ADMIN_CORS"
  "AUTH_CORS"
  "MEDUSA_BACKEND_URL"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Warning: $var is not set"
  else
    echo "$var is set"
  fi
done

# Install required plugins
echo "Installing required plugins..."
npm install medusa-fulfillment-manual medusa-payment-manual

# Create admin UI directories and files
echo "Creating admin UI directories and files..."
mkdir -p build/admin/assets
echo '<!DOCTYPE html><html><head><title>Medusa Admin</title><link rel="stylesheet" href="./assets/index.css"></head><body><div id="root"></div><script src="./assets/index.js"></script></body></html>' > build/admin/index.html
echo 'body { font-family: Arial, sans-serif; }' > build/admin/assets/index.css
echo 'document.getElementById("root").innerHTML = "Medusa Admin";' > build/admin/assets/index.js

# List all directories to verify
echo "Listing all directories to verify:"
ls -la build/admin || echo "build/admin not found"
ls -la build/admin/assets || echo "build/admin/assets not found"

# Run migrations
echo "Running migrations..."
medusa migrations run || echo "Migrations failed, but continuing..."

# Start the server
echo "Starting Medusa server..."
export NODE_ENV=production
medusa start 