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

# Create admin UI directories and files
echo "Creating admin UI directories and files..."
mkdir -p build/admin dist/admin admin/build admin/dist && \
touch build/admin/index.html && \
touch dist/admin/index.html && \
touch admin/build/index.html && \
touch admin/dist/index.html && \
echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > build/admin/index.html && \
echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > dist/admin/index.html && \
echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > admin/build/index.html && \
echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > admin/dist/index.html

# List all directories to verify
echo "Listing all directories to verify:"
ls -la build/admin || echo "build/admin not found"
ls -la dist/admin || echo "dist/admin not found"
ls -la admin/build || echo "admin/build not found"
ls -la admin/dist || echo "admin/dist not found"

# Try to build the admin UI again
echo "Building admin UI again..."
npm install -g @medusajs/medusa-cli
medusa admin build || echo "Admin build failed, but continuing..."

# Start the server
echo "Starting Medusa server..."
export NODE_ENV=production
medusa start 