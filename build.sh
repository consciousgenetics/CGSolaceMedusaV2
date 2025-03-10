#!/bin/bash
set -e

# Print system information
echo "System information:"
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"
echo "Operating system: $(uname -a)"
echo "Memory info:"
free -h || true

# Clear any existing build artifacts
echo "Cleaning previous build..."
rm -rf dist || echo "No dist directory to clean"

# Install dependencies with extended timeout and verbose logging
echo "Installing dependencies..."
yarn install --network-timeout 600000 --verbose

# Build the application with increased memory limit
echo "Building application..."
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=8192"

# Run the build with error catching
if ! yarn build:medusa; then
    echo "Build failed. Check the error messages above."
    exit 1
fi

echo "Build completed successfully!" 