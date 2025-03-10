#!/bin/bash
set -e

# Enable debug mode
set -x

# Print system information
echo "System information:"
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"
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

# Install dependencies with extended timeout and verbose logging
echo "Installing dependencies..."
yarn config set network-timeout 600000
yarn config set network-concurrency 1
yarn install --frozen-lockfile --verbose || {
    echo "Yarn install failed. Checking yarn cache and network..."
    yarn cache list
    yarn config list
    echo "Attempting to clear yarn cache and retry..."
    yarn cache clean
    yarn install --frozen-lockfile --verbose
}

# Build the application with increased memory limit
echo "Building application..."
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=8192"

# Run the build with error catching and verbose output
echo "Running medusa build..."
if ! yarn build:medusa 2>&1; then
    echo "Build failed. Check the error messages above."
    echo "Current directory contents:"
    ls -la
    echo "Node modules contents:"
    ls -la node_modules || true
    echo "Yarn cache contents:"
    yarn cache list || true
    echo "Environment variables:"
    env | sort
    exit 1
fi

echo "Build completed successfully!" 