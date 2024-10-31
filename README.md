# Zenica Bus Tracking Application

This application is designed for tracking buses in the city of Zenica, Bosnia and Herzegovina.

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

### Development

1. **Install dependencies**:

```bash
pnpm install
```

2. **Frontend Setup**:

Setup the `.env.local` or `.env.production` file by copying the `.env.example` and replacing the placeholders values

```bash
cp ./frontend/.env.example ./frontend/.env.local
```

3. **Backend Setup**:

Setup the `.env` file by copying the `.env.example` and replacing the placeholders values

```bash
cp ./backend/.env.example ./backend/.env
```

> [!NOTE]  
> If using Gmail, you may need to enable "Less secure app access" or use an App Password to authenticate.


4. **Run the Application**:

Run both the frontend and backend together:

```bash
pnpm turbo dev
```

5. **Lint and Test (Optional)**:

Before pushing changes consider running the linter and testing the applications locally

```bash
pnpm turbo run lint
```

```bash
pnpm turbo run test
```

> [!NOTE]  
> This step is optional as it will be done by a github action on push and pull request

## Accessing the Application

After setting up and running the application, you can access it at:

[http://localhost:3000](http://localhost:3000)
