# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json files
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN cd client && npm install
RUN cd server && npm install

# Copy source code
COPY . .

# Build client
RUN cd client && npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start", "--prefix", "server"] 