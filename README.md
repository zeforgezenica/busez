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

   ```env
   SMTP_HOST=your-smtp-host                # e.g., smtp.gmail.com
   SMTP_PORT=your-smtp-port                # e.g., 587 for TLS or 465 for SSL
   SMTP_USER=your-email@gmail.com           # Your email address
   SMTP_PASS=your-app-password              # Your app password for the email account
   SENDER_EMAIL=your-sender-email           # Email address from which the emails will be sent
   DEFAULT_RECEIVER_EMAIL=recipient@example.com # Default recipient email address
   DEFAULT_RECEIVER_NAME=your-receiver-name     # Name of the default recipient
   ```

   Make sure to replace the placeholders with your actual values.

   **NOTE**
   If you are using Gmail, you need to enable "Less secure app access" or use an App Password to authenticate.

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