# Use Node.js 22 Alpine for smaller image size
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies for React Native
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy project files
COPY . .

# Expose Metro bundler port
EXPOSE 8081

# Expose Expo port
EXPOSE 19000 19001 19002

# Start the development server
CMD ["npm", "start"]

