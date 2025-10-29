# Use an official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy all files into the container
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000 (or your app’s port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
