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
  "REDIS_URL"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Warning: $var is not set"
  else
    echo "$var is set"
  fi
done

# Run migrations
echo "Running migrations..."
medusa migrations run || echo "Migrations failed, but continuing..."

# Start the server
echo "Starting Medusa server..."
export NODE_ENV=production
medusa start 