# Use the official Node.js image as base
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies, not just production
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which your app runs
EXPOSE 3000

# Set NODE_ENV to 'development'
ENV NODE_ENV=development

# Command to run the application
CMD ["npm", "run", "dev"]
