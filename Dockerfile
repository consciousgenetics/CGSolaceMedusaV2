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

# Install dependencies with npm (including dev dependencies for build)
RUN npm install --no-audit --no-fund --loglevel verbose

# Copy the rest of the application
COPY . .

# Create necessary directories if they don't exist
RUN mkdir -p dist src static uploads build/admin dist/admin admin/build admin/dist

# Make scripts executable
RUN chmod +x build.sh
RUN chmod +x start.sh

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Build the application
RUN ./build.sh || (echo "Build failed. Checking directory contents:" && ls -la && exit 1)

# Create empty instrumentation file if it doesn't exist
RUN if [ ! -f instrumentation.ts ]; then \
    echo "console.log('Instrumentation placeholder');" > instrumentation.ts; \
    fi

# Install Medusa CLI and build admin UI
RUN npm install -g @medusajs/medusa-cli && \
    medusa admin build

# Create index.html in all possible admin UI locations
RUN echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > build/admin/index.html && \
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > dist/admin/index.html && \
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > admin/build/index.html && \
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > admin/dist/index.html

# Production stage
FROM node:20-slim

WORKDIR /app

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy the entire application from the builder stage
COPY --from=builder /app/ /app/

# Install production dependencies and ts-node
RUN npm install --production --no-audit --no-fund && \
    npm install -g ts-node typescript @medusajs/medusa-cli

# Create empty instrumentation file if it doesn't exist
RUN if [ ! -f instrumentation.js ]; then \
    echo "console.log('Instrumentation placeholder');" > instrumentation.js; \
    fi

# Create admin UI directories in all possible locations
RUN mkdir -p build/admin dist/admin admin/build admin/dist && \
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > build/admin/index.html && \
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > dist/admin/index.html && \
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > admin/build/index.html && \
    echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > admin/dist/index.html

# Set environment variables
ENV NODE_ENV=production
ENV PATH="/app/node_modules/.bin:${PATH}"

# Make start script executable
RUN chmod +x start.sh

# Expose the port the app runs on
EXPOSE 9000

# Start the application
CMD ["./start.sh"] 