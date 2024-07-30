# Use an official Node.js runtime as the base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY ../package*.json ./

# Install the application dependencies
RUN npm install

# Copy the entire Angular app source code to the container
COPY . .

# Build the Angular application for production
RUN npm run build

# Use a lightweight Nginx image as the final image
FROM nginx:alpine

# Verify the contents of the Nginx image (for debugging purposes)
RUN ls -l /usr/share/nginx/html

# Copy the built Angular app from the previous stage to the Nginx web server directory
# The dist directory is outside of src/app, hence use ../dist
COPY --from=build /dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/

# Expose port 80 for serving the web application
EXPOSE 80

# Start the Nginx web server when the container runs
CMD ["nginx", "-g", "daemon off;"]
