FROM node:20-alpine

WORKDIR /app

# Install build essentials
RUN apk add --no-cache python3 make g++ git

# Copy package.json and yarn.lock
COPY package.json yarn.lock .yarnrc.yml* .npmrc* ./

# Install dependencies with verbose logging
RUN yarn install --network-timeout 600000

# Copy the rest of the application
COPY . .

# Set production environment
ENV NODE_ENV production

# Run migrations and build
RUN yarn prebuild || true
RUN NODE_OPTIONS="--max-old-space-size=4096" yarn build

# Expose the port
EXPOSE 9000

# Start the application
CMD ["yarn", "start"] 