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

# Install yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies with a different strategy
RUN yarn config set network-timeout 600000 && \
    yarn config set network-concurrency 1 && \
    yarn config set registry https://registry.npmjs.org/ && \
    yarn install --frozen-lockfile --prefer-offline --verbose

# Copy the rest of the application
COPY . .

# Make build script executable
RUN chmod +x build.sh

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Build the application
RUN ./build.sh

# Production stage
FROM node:20-slim

WORKDIR /app

# Install production dependencies only
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN corepack enable && corepack prepare yarn@stable --activate && \
    yarn install --production --frozen-lockfile --prefer-offline

# Copy built application
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 9000

# Start the application
CMD ["yarn", "start"] 