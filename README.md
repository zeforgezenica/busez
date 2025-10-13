# Zenica Bus Tracking Application

This application is designed for tracking buses in the city of Zenica, Bosnia and Herzegovina.

**Deployment**: [Zenica Bus Tracking](https://kadjebus.zeforge.ba)

## Project Design

- **Figma Idea #1**: [View Project on Figma](https://www.figma.com/design/Evsz1Ttu66byoB9j1dneq6/Untitled?node-id=2-2&t=tdBFS2mRirxmebKC-1)
- **Figma Idea #2**: [View Project on Figma](https://www.figma.com/design/5fO5ky3p3nOG1QhNoGyefi/Kad-je-bus?node-id=0-1&t=CgSKo3MISOQGqgrU-1)

**Join our Community**: [ZeForge Discord server](https://discord.gg/x2enz95pDF)

---

## 🚀 Features

- 🚌 Real-time bus tracking
- 📍 Station and route management
- 🏢 Agency information
- 📧 Contact via email
- 🗺️ Interactive maps with Leaflet
- 📱 Responsive design
- 🔒 Secure API with rate limiting
- 📝 API documentation with Swagger
- 🐳 Docker support

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Material-UI, NextUI
- **Maps**: Leaflet, React Leaflet
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Date Handling**: Day.js, date-fns

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: JavaScript
- **Validation**: JSON Schema (AJV) + Joi for env
- **Logging**: Winston
- **Security**: Helmet, Rate Limiting
- **Email**: Nodemailer
- **API Docs**: Swagger/OpenAPI

### DevOps
- **Monorepo**: Turborepo + pnpm workspaces
- **Testing**: Jest + Supertest
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions
- **Containerization**: Docker + Docker Compose

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js**: v20.16.0 or higher - [Download Node.js](https://nodejs.org/en/download/package-manager)
- **pnpm**: v9.7.1 or higher - [Install pnpm](https://pnpm.io/installation)

Alternatively, use Docker:
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Development Setup

#### Option 1: Local Development (Recommended)

1. **Clone the repository**:

```bash
git clone https://github.com/zeforgezenica/busez.git
cd busez
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Frontend Setup**:

Setup the `.env.local` file by copying the `.env.example`:

```bash
cp ./frontend/.env.example ./frontend/.env.local
```

Edit `frontend/.env.local` and configure your environment variables.

4. **Backend Setup**:

Setup the `.env` file by copying the `.env.example`:

```bash
cp ./backend/.env.example ./backend/.env
```

Edit `backend/.env` and configure your SMTP settings.

> [!NOTE]  
> If using Gmail, you may need to enable "Less secure app access" or use an App Password to authenticate.

5. **Run the Application**:

Run both frontend and backend together:

```bash
pnpm turbo dev
```

Or run them separately:

```bash
# Terminal 1 - Backend
cd backend
pnpm run dev

# Terminal 2 - Frontend
cd frontend
pnpm run dev
```

#### Option 2: Docker Development

1. **Setup environment files** (same as Option 1, steps 3-4)

2. **Run with Docker Compose**:

```bash
docker-compose up --build
```

This will start both frontend and backend in containers.

### Code Quality & Testing

#### Format Code

```bash
# Format all files
pnpm run format

# Check formatting
pnpm run format:check
```

#### Linting

```bash
# Lint all packages
pnpm turbo run lint

# Lint backend only
cd backend && pnpm run lint
```

#### Testing

```bash
# Run all tests
pnpm turbo run test

# Run backend tests only
cd backend && pnpm run test

# Run frontend tests only
cd frontend && pnpm run test
```

> [!NOTE]  
> Linting and testing are automatically run by GitHub Actions on push and pull requests.

---

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

**Swagger UI**: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/countries` | GET | Get all countries |
| `/cities` | GET | Get all cities |
| `/cities/:id` | GET | Get city by ID |
| `/agencies` | GET | Get all agencies |
| `/agencies/:id` | GET | Get agency by ID |
| `/stations` | GET | Get all stations |
| `/stations/:id` | GET | Get station by ID |
| `/routes` | GET | Get all routes |
| `/routes/:id` | GET | Get route by ID |
| `/sendEmail` | POST | Send email |

---

## 🔒 Security Features

- **Helmet.js**: Secure HTTP headers
- **Rate Limiting**: 
  - General API: 100 requests per 15 minutes
  - Email endpoint: 5 requests per hour
- **CORS**: Configured for cross-origin requests
- **Input Validation**: JSON Schema validation
- **Environment Validation**: Joi validation on startup
- **Error Handling**: Centralized error handler with logging

---

## 📁 Project Structure

```
busez/
├── backend/              # Express.js backend
│   ├── controllers/      # Request handlers
│   ├── routes/          # API routes
│   ├── schemas/         # JSON schemas
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utilities (logger, validation)
│   ├── config/          # Configuration files
│   └── test/            # Backend tests
├── frontend/            # Next.js frontend
│   ├── src/
│   │   ├── app/        # Next.js app directory
│   │   ├── components/ # React components
│   │   ├── services/   # API services
│   │   └── lib/        # Utilities
│   └── public/         # Static assets
├── database/            # JSON database files
│   └── data/           # Data files
├── docker-compose.yml   # Docker orchestration
└── turbo.json          # Turborepo configuration
```

---

## 🌐 Accessing the Application

After setting up and running the application, you can access:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3001](http://localhost:3001)
- **API Documentation**: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
- **Health Check**: [http://localhost:3001/health](http://localhost:3001/health)

---

## 🚢 Deployment

### Production Build

```bash
# Build all packages
pnpm turbo run build

# Start production server
cd frontend && pnpm run start
cd backend && NODE_ENV=production node server.js
```

### Docker Production

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Run production containers
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Developed by **ZeForge** - [zeforge.ba](https://zeforge.ba)

Join our community on [Discord](https://discord.gg/x2enz95pDF)!
