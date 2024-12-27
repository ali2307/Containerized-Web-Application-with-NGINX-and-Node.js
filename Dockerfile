# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /root/Health_care


# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3006

# Command to run the application
CMD ["node", "server.js"]
