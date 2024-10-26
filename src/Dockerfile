# Use the official Node.js image for building the frontend
FROM node:14 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Use nginx to serve the frontend
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
