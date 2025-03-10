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
RUN mkdir -p dist src static uploads

# Make build script executable
RUN chmod +x build.sh

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Build the application
RUN ./build.sh || (echo "Build failed. Checking directory contents:" && ls -la && exit 1)

# Create empty instrumentation file if it doesn't exist
RUN if [ ! -f instrumentation.ts ]; then \
    echo "console.log('Instrumentation placeholder');" > instrumentation.ts; \
    fi

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
    npm install -g ts-node typescript

# Create empty instrumentation file if it doesn't exist
RUN if [ ! -f instrumentation.js ]; then \
    echo "console.log('Instrumentation placeholder');" > instrumentation.js; \
    fi

# Set environment variables
ENV NODE_ENV=production
ENV PATH="/app/node_modules/.bin:${PATH}"

# Expose the port the app runs on
EXPOSE 9000

# Start the application
CMD ["npm", "start"] 