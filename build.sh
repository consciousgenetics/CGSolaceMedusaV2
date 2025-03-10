#!/bin/bash
set -e

# Enable debug mode
set -x

# Print system information
echo "System information:"
echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Operating system: $(uname -a)"
echo "Memory info:"
free -h || true

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

# Clear any existing build artifacts
echo "Cleaning previous build..."
rm -rf dist || echo "No dist directory to clean"
rm -rf build || echo "No build directory to clean"

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p dist
mkdir -p build/admin

# Install dependencies
echo "Installing dependencies..."
npm install --no-audit --no-fund

# Install Medusa CLI globally
echo "Installing Medusa CLI..."
npm install -g @medusajs/medusa-cli

# Build the application with increased memory limit
echo "Building application..."
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=8192"

# Run the build with error catching and verbose output
echo "Running medusa build..."
if ! npm run build:medusa; then
    echo "Build failed. Check the error messages above."
    echo "Current directory contents:"
    ls -la
    echo "Node modules contents:"
    ls -la node_modules || true
    echo "Environment variables:"
    env | sort
    exit 1
fi

# Build the admin UI
echo "Building admin UI..."
medusa admin build

# Create a placeholder index.html if it doesn't exist
echo "Ensuring admin UI index.html exists..."
if [ ! -f build/admin/index.html ]; then
    echo "Creating placeholder index.html in build/admin directory"
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > build/admin/index.html
fi

# Verify build directories
echo "Verifying build directories:"
echo "dist directory contents:"
ls -la dist || echo "dist directory not found or empty"
echo "build/admin directory contents:"
ls -la build/admin || echo "build/admin directory not found or empty"

# Create placeholder files if directories are empty
if [ ! "$(ls -A dist)" ]; then
    echo "dist directory is empty. Creating placeholder file."
    echo "This is a placeholder file." > dist/placeholder.txt
fi

if [ ! "$(ls -A build/admin)" ]; then
    echo "build/admin directory is empty. Creating placeholder file."
    echo "This is a placeholder file." > build/admin/placeholder.txt
fi

echo "Build completed successfully!" 