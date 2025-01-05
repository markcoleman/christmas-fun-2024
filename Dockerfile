# Use a lightweight Node base image
FROM node:18-alpine

# Create and switch to the app directory
WORKDIR /app

# Copy package.json + package-lock.json first, then install
COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts

# Copy the rest of your source code (index.js, asciiArt.js, etc.)
COPY . .

# Force Chalk to use color
ENV FORCE_COLOR=1

# Run "node index.js" by default
CMD ["node", "index.js"]