# Frontend Dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy root package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy frontend package files
COPY frontend/package.json ./frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy frontend source
COPY frontend ./frontend

# Expose port
EXPOSE 3000

# Set working directory to frontend
WORKDIR /app/frontend

# Start the application
CMD ["pnpm", "run", "dev"]
