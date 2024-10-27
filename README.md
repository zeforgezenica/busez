# Zenica Bus Tracking Application

This application is designed for real-time tracking of buses in the city of Zenica, Bosnia and Herzegovina.

**Deployment**: [Zenica Bus Tracking](https://kadjebus.zeforge.ba)

## Project Design

- **Figma Idea #1**: [View Project on Figma](https://www.figma.com/design/Evsz1Ttu66byoB9j1dneq6/Untitled?node-id=2-2&t=tdBFS2mRirxmebKC-1)
- **Figma Idea #2**: [View Project on Figma](https://www.figma.com/design/5fO5ky3p3nOG1QhNoGyefi/Kad-je-bus?node-id=0-1&t=CgSKo3MISOQGqgrU-1)

**Join our Community**: [ZeForge Discord server](https://discord.gg/x2enz95pDF)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/en/download/package-manager)
- **pnpm**: [Install pnpm](https://pnpm.io/installation)

### Installation

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Frontend Setup**:

   - For local development, create a `.env.local` file with the following:

     ```plaintext
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```

   - For production builds, create a `.env.production` file:

     ```plaintext
     NEXT_PUBLIC_API_URL=https://production-server-url.com
     ```

3. **Backend Setup**:

   - In the `/backend/` directory, create a `.env` file and add the following environment variables:

     ```plaintext
     SMTP_HOST=your-smtp-host                # e.g., smtp.gmail.com
     SMTP_PORT=your-smtp-port                # e.g., 587 for TLS or 465 for SSL
     SMTP_USER=your-email@gmail.com           # Your email address
     SMTP_PASS=your-app-password              # App password for the email account
     SENDER_EMAIL=your-sender-email           # Email address for outgoing emails
     DEFAULT_RECEIVER_EMAIL=recipient@example.com # Default recipient email address
     DEFAULT_RECEIVER_NAME=your-receiver-name     # Name of the default recipient
     ```

   - Replace placeholders with your actual values. **Note**: If using Gmail, you may need to enable "Less secure app access" or use an App Password to authenticate.

4. **Run the Server**:

   ```bash
   pnpm turbo dev
   ```

## Running the Application

After setting up the frontend and backend, you can access the application at:

[http://localhost:3000](http://localhost:3000)
