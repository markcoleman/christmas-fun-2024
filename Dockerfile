# ============================
# 1) Builder Stage
# ============================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json + package-lock.json first for caching
COPY package*.json ./

# Install all dependencies (including dev) so we can build
RUN npm install

# Copy the rest of your source (TS files, etc.)
COPY . .

# Build TypeScript -> JavaScript
RUN npm run build  # e.g. "tsc" or whatever your "build" script is in package.json

# ============================
# 2) Final Stage
# ============================
FROM node:18-alpine

WORKDIR /app

# Copy only the compiled JS output plus package*.json
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install production-only dependencies
RUN npm install --omit=dev --ignore-scripts

# Force Chalk to use color
ENV FORCE_COLOR=1

# Run the compiled code by default
CMD ["node", "dist/index.js"]