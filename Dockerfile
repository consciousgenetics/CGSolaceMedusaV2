FROM node:20-alpine

WORKDIR /app

# Add essential tools
RUN apk add --no-cache bash curl git python3 make g++

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files
COPY . .

# Make fix script executable
RUN chmod +x fix-admin.sh

# Build the Medusa application
RUN yarn build

# Fix admin panel - modify HTML file to inject our script
RUN ./fix-admin.sh

# Expose default Medusa port
EXPOSE 9000

# Start the server
CMD ["yarn", "start"] 