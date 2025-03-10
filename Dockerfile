FROM node:20-slim

WORKDIR /app

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Copy package files
COPY package.json yarn.lock ./

# Copy the rest of the application
COPY . .

# Make build script executable
RUN chmod +x build.sh

# Build the application
RUN ./build.sh

# Expose the port the app runs on
EXPOSE 9000

# Start the application
CMD ["yarn", "start"] 