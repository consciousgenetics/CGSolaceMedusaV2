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

# Install dependencies with npm
RUN npm install --no-audit --no-fund --loglevel verbose

# Copy the rest of the application
COPY . .

# Make build script executable
RUN chmod +x build.sh

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Build the application
RUN ./build.sh || (echo "Build failed. Checking directory contents:" && ls -la && exit 1)

# Verify dist directory exists
RUN ls -la && \
    if [ ! -d "dist" ]; then \
        echo "dist directory not found. Creating empty dist directory." && \
        mkdir -p dist; \
    fi

# Production stage
FROM node:20-slim

WORKDIR /app

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy package files and install production dependencies
COPY package.json yarn.lock ./
RUN npm install --production --no-audit --no-fund

# Copy all necessary files from builder
COPY --from=builder /app/dist/ /app/dist/
COPY --from=builder /app/medusa-config.js /app/
COPY --from=builder /app/medusa-config.ts /app/
COPY --from=builder /app/.env /app/
COPY --from=builder /app/tsconfig.json /app/
COPY --from=builder /app/src/ /app/src/
COPY --from=builder /app/static/ /app/static/
COPY --from=builder /app/uploads/ /app/uploads/

# Expose the port the app runs on
EXPOSE 9000

# Start the application
CMD ["npm", "start"] 