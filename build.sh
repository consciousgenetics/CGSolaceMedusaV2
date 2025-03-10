#!/bin/bash
set -e

# Print current Node.js version
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"

# Clear any existing build artifacts
yarn clean || true

# Install dependencies with extended timeout
echo "Installing dependencies..."
yarn install --network-timeout 600000

# Build the application with increased memory limit
echo "Building application..."
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=4096"
yarn build:medusa

echo "Build completed successfully!" 