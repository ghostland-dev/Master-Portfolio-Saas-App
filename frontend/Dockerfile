# Use official Node.js image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock (or package-lock.json) to install dependencies
COPY package.json package.lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm","run", "start"]
