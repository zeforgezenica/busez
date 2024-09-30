# Zenica Bus Tracking Application

This application is designed for tracking buses in the city of Zenica, Bosnia and Herzegovina.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

1. **Set up the Frontend:**

   ```bash
   cd frontend
   npm i
   ```

   **For local development**, create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   **For production builds**, create a `.env.production` file:

   ```env
   NEXT_PUBLIC_API_URL=https://production-server-url.com
   ```

   Once the environment variables are set, run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

2. **Set up the Backend:**

   ```bash
   cd backend
   npm i
   ```

   Create a `.env` file in `/backend/` and add the following environment variables:

   ```plaintext
   MAILJET_API_KEY=your-mailjet-api-key
   MAILJET_API_SECRET=your-mailjet-api-secret
   SENDER_EMAIL=your-sender-email
   DEFAULT_RECEIVER_EMAIL=default-receiver-email
   DEFAULT_RECEIVER_NAME=default-receiver-name
   ```

   Once the `.env` file is added, run the server:

   ```bash
   npm run server
   # or
   yarn server
   # or
   pnpm server
   # or
   bun server
   ```

### Running the Application

After setting up the frontend and backend, you can access the application at:

http://localhost:3000