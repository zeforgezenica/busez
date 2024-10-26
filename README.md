# Zenica Bus Tracking Application

This application is designed for tracking buses in the city of Zenica, Bosnia and Herzegovina.

Deployment: https://kadjebus.zeforge.ba

Figma Idea #1 Project File Link: https://www.figma.com/design/Evsz1Ttu66byoB9j1dneq6/Untitled?node-id=2-2&t=tdBFS2mRirxmebKC-1

Figma Idea #2 Project File Link: https://www.figma.com/design/5fO5ky3p3nOG1QhNoGyefi/Kad-je-bus?node-id=0-1&t=CgSKo3MISOQGqgrU-1

Link to ZeForge Discord server: https://discord.gg/x2enz95pDF

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (https://nodejs.org/en/download/package-manager)
- pnpm (https://pnpm.io/installation)

### Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up the Frontend:**
 

   **For local development**, create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   **For production builds**, create a `.env.production` file:

   ```env
   NEXT_PUBLIC_API_URL=https://production-server-url.com
   ```
 

2. **Set up the Backend:**
 
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
 
3. **Run the application:**
 
   ```bash
   pnpm turbo dev
   ```

### Running the Application

After setting up the frontend and backend, you can access the application at:

http://localhost:3000
