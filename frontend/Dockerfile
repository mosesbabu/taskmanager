# Use the official Node.js image as the base image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Expose the port serve runs on
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build"]
s