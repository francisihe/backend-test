# Use the official Node.js image as the base image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source code
COPY . .

# Run Build 
RUN npm run build

# Expose the port on which your app will run
EXPOSE 8080

# Start the application
CMD ["npm", "start"]