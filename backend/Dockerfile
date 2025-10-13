# Backend Dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy root package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy backend package files
COPY backend/package.json ./backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy backend source
COPY backend ./backend

# Create logs directory
RUN mkdir -p backend/logs

# Expose port
EXPOSE 3001

# Set working directory to backend
WORKDIR /app/backend

# Start the application
CMD ["pnpm", "run", "dev"]
