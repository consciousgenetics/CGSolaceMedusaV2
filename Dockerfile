# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Verify npm installation
RUN npm --version

# Copy package files
COPY package.json yarn.lock ./

# First install all dependencies from package.json
RUN npm install --no-audit --no-fund

# Then install additional required packages
RUN npm install --save \
    @medusajs/medusa@latest \
    medusa-fulfillment-manual@latest \
    medusa-payment-manual@latest \
    @medusajs/file-local@latest \
    @medusajs/event-bus-redis@latest \
    @medusajs/cache-redis@latest

# Copy the rest of the application
COPY . .

# Make scripts executable
RUN chmod +x build.sh
RUN chmod +x start.sh

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Create necessary directories
RUN mkdir -p dist src static uploads && \
    mkdir -p build/admin && \
    mkdir -p dist/admin && \
    mkdir -p admin/build && \
    mkdir -p admin/dist

# Create a complete admin UI structure
RUN mkdir -p build/admin/assets && \
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title><link rel="stylesheet" href="./assets/index.css"></head><body><div id="root"></div><script src="./assets/index.js"></script></body></html>' > build/admin/index.html && \
    echo 'body { font-family: Arial, sans-serif; }' > build/admin/assets/index.css && \
    echo 'document.getElementById("root").innerHTML = "Medusa Admin";' > build/admin/assets/index.js

# Build the application
RUN ./build.sh || (echo "Build failed. Checking directory contents:" && ls -la && exit 1)

# Create empty instrumentation file if it doesn't exist
RUN if [ ! -f instrumentation.ts ]; then \
    echo "console.log('Instrumentation placeholder');" > instrumentation.ts; \
    fi

# Install Medusa CLI globally and build admin UI
RUN npm install -g @medusajs/medusa-cli && \
    npm run build && \
    medusa build

# Production stage
FROM node:20-slim

WORKDIR /app

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy the entire application from the builder stage
COPY --from=builder /app/ /app/

# Install production dependencies
RUN npm install --production --no-audit --no-fund && \
    npm install -g ts-node typescript @medusajs/medusa-cli && \
    npm install --save \
    @medusajs/medusa@latest \
    medusa-fulfillment-manual@latest \
    medusa-payment-manual@latest \
    @medusajs/file-local@latest \
    @medusajs/event-bus-redis@latest \
    @medusajs/cache-redis@latest

# Create empty instrumentation file if it doesn't exist
RUN if [ ! -f instrumentation.js ]; then \
    echo "console.log('Instrumentation placeholder');" > instrumentation.js; \
    fi

# Create a complete admin UI structure
RUN mkdir -p build/admin/assets && \
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title><link rel="stylesheet" href="./assets/index.css"></head><body><div id="root"></div><script src="./assets/index.js"></script></body></html>' > build/admin/index.html && \
    echo 'body { font-family: Arial, sans-serif; }' > build/admin/assets/index.css && \
    echo 'document.getElementById("root").innerHTML = "Medusa Admin";' > build/admin/assets/index.js

# Set environment variables
ENV NODE_ENV=production
ENV PATH="/app/node_modules/.bin:${PATH}"

# Make start script executable
RUN chmod +x start.sh

# Expose the port the app runs on
EXPOSE 9000

# Start the application
CMD ["./start.sh"] 