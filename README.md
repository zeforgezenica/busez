# 🚌 Zenica Bus Tracking Application

![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-blueviolet?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open--Source-💻-success?style=for-the-badge)
![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge)
![Made with Love](https://img.shields.io/badge/Made%20with-Love-orange?style=for-the-badge)

---

## 🌐 Live Application

🚍 **Visit Here:** [Zenica Bus Tracking](https://kadjebus.zeforge.ba)

Stay informed about **bus schedules and routes** in **Zenica, Bosnia and Herzegovina** with this open-source project.  
The app provides an easy and modern way to check public transport information across the city.

---

## 💡 About the Project

**Zenica Bus Tracking Application** allows users to:

- View live or scheduled bus routes in Zenica.
- Access clean and responsive UI built for both mobile and desktop.
- Experience real-time updates and accurate data visualization.

The project is maintained by **ZeForge Zenica Community** and welcomes open-source contributors!

---

## 🎨 Design Inspiration

Take a look at our design mockups on **Figma**:

- [🎨 Figma Idea #1](https://www.figma.com/design/Evsz1Ttu66byoB9j1dneq6/Untitled?node-id=2-2&t=tdBFS2mRirxmebKC-1)
- [🎨 Figma Idea #2](https://www.figma.com/design/5fO5ky3p3nOG1QhNoGyefi/Kad-je-bus?node-id=0-1&t=CgSKo3MISOQGqgrU-1)

---

## 🤝 Join the Community

Connect with other developers and contributors:

💬 [Join ZeForge Discord Server](https://discord.gg/x2enz95pDF)

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

## 🛠️ Getting Started

### Prerequisites

Make sure you have installed:

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
# Copy the example environment file
cp ./backend/.env.example ./backend/.env
```

**Important**: Email functionality is **disabled by default** to allow developers to run the backend without configuring SMTP settings.

To run the backend without email functionality (default):
- The `.env` file has `ENABLE_EMAIL=false` by default
- No SMTP configuration is required
- The `/sendEmail` endpoint will return a 503 error when called

To enable email functionality (optional):
1. Set `ENABLE_EMAIL=true` in your `.env` file
2. Configure all SMTP settings in the `.env` file:
   - `SMTP_HOST` (e.g., smtp.gmail.com)
   - `SMTP_PORT` (e.g., 587 for TLS or 465 for SSL)
   - `SMTP_USER` (your email address)
   - `SMTP_PASS` (your email password or app password)
   - `SENDER_EMAIL` (sender email address)
   - `DEFAULT_RECEIVER_EMAIL` (recipient email address)
   - `DEFAULT_RECEIVER_NAME` (recipient name)

> [!NOTE]  
> If using Gmail, you may need to enable "Less secure app access" or use an App Password to authenticate.

**For Testing Email Functionality**:
- Email tests are automatically disabled when `ENABLE_EMAIL=false`
- To run email tests, set `ENABLE_EMAIL=true` and configure all SMTP settings
- This prevents test failures when SMTP credentials are not available

**Email API Endpoint Behavior**:
- When `ENABLE_EMAIL=false`: POST `/sendEmail` returns HTTP 503 with message "Email functionality is currently disabled"
- When `ENABLE_EMAIL=true`: POST `/sendEmail` processes email requests normally

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
