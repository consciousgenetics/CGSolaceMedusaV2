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

# Verify build directories
echo "Verifying build directories:"
echo "dist directory contents:"
ls -la dist || echo "dist directory not found or empty"
echo "build/admin directory contents:"
ls -la build/admin || echo "build/admin directory not found or empty"

# Ensure admin UI directory exists with index.html
if [ ! -d build/admin ]; then
    echo "Creating build/admin directory"
    mkdir -p build/admin
fi

if [ ! -f build/admin/index.html ]; then
    echo "Creating placeholder index.html in build/admin directory"
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > build/admin/index.html
fi

# Start the server
echo "Starting Medusa server..."
export NODE_ENV=production
medusa start 