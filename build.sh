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

# Configure yarn
echo "Configuring yarn..."
yarn config set network-timeout 600000
yarn config set network-concurrency 1
yarn config set registry https://registry.npmjs.org/

# Install dependencies with retry logic
echo "Installing dependencies..."
max_retries=3
retry_count=1

while [ $retry_count -le $max_retries ]; do
    echo "Attempt $retry_count of $max_retries"
    if yarn install --frozen-lockfile --prefer-offline --verbose; then
        echo "Dependencies installed successfully"
        break
    else
        echo "Installation failed, checking yarn cache and network..."
        yarn cache list
        yarn config list
        if [ $retry_count -eq $max_retries ]; then
            echo "All retry attempts failed"
            exit 1
        fi
        echo "Clearing yarn cache and retrying..."
        yarn cache clean
        retry_count=$((retry_count + 1))
    fi
done

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