# Development Guide

## Getting Started

### First Time Setup

1. Install Node.js v20.16.0+ and pnpm v9.7.1+
2. Clone the repository
3. Run `pnpm install` in the root directory
4. Copy `.env.example` files to `.env` in both backend and frontend
5. Configure your environment variables
6. Run `pnpm turbo dev` to start development

### Environment Variables

#### Backend (.env)
- `SMTP_HOST` - Your SMTP server (e.g., smtp.gmail.com)
- `SMTP_PORT` - SMTP port (587 for TLS, 465 for SSL)
- `SMTP_USER` - Your email address
- `SMTP_PASS` - Your email app password
- `SENDER_EMAIL` - Email address to send from
- `DEFAULT_RECEIVER_EMAIL` - Default recipient email
- `DEFAULT_RECEIVER_NAME` - Default recipient name
- `NODE_ENV` - Environment (development/production/test)
- `LOG_LEVEL` - Logging level (error/warn/info/debug)

#### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL (http://localhost:3001)

### Project Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm turbo dev                    # Run all services
cd backend && pnpm run dev        # Backend only
cd frontend && pnpm run dev       # Frontend only

# Code Quality
pnpm run format                   # Format all files
pnpm run format:check             # Check formatting
pnpm turbo run lint               # Lint all packages

# Testing
pnpm turbo run test               # Run all tests
cd backend && pnpm run test       # Backend tests only
cd frontend && pnpm run test      # Frontend tests only

# Docker
docker-compose up --build         # Start with Docker
docker-compose down               # Stop containers
```

## Code Standards

### Backend
- Use ESLint configuration in `.eslintrc.json`
- Follow Node.js best practices
- Use async/await for asynchronous operations
- Use the logger (`utils/logger.js`) instead of console.log
- Always validate input using JSON Schema
- Use error handling middleware

### Frontend
- Use TypeScript strictly
- Follow React/Next.js best practices
- Use functional components with hooks
- Implement proper error handling
- Use the API service layer for backend calls

### General
- Follow Prettier formatting rules
- Write meaningful commit messages
- Add tests for new features
- Update documentation when needed

## Testing

### Backend Tests
Located in `backend/test/`
- Use Jest and Supertest
- Test API endpoints
- Mock file system operations
- Run with `pnpm run test`

### Frontend Tests
Located in `frontend/src/`
- Use Jest and React Testing Library
- Test components and hooks
- Run with `pnpm run test`

## Logging

The backend uses Winston for logging:

```javascript
const logger = require('./utils/logger');

logger.info('Information message');
logger.warn('Warning message');
logger.error('Error message', { error });
logger.debug('Debug message');
```

Logs are written to:
- Console (formatted and colorized)
- `logs/error.log` (errors only)
- `logs/combined.log` (all logs)

## API Documentation

Access Swagger UI at: http://localhost:3001/api-docs

To add documentation to a new endpoint:

```javascript
/**
 * @swagger
 * /api/endpoint:
 *   get:
 *     summary: Endpoint description
 *     responses:
 *       200:
 *         description: Success
 */
```

## Security

### Rate Limiting
- General API: 100 requests per 15 minutes
- Email endpoint: 5 requests per hour
- Customize in `middleware/rateLimiter.js`

### Security Headers
Helmet.js is configured to set secure HTTP headers automatically.

### Input Validation
All API inputs are validated using JSON Schema (AJV).

## Docker Development

### Build and Run
```bash
docker-compose up --build
```

### Access Containers
```bash
docker exec -it busez-backend sh
docker exec -it busez-frontend sh
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Kill the process using the port or change the port in env

2. **SMTP errors**
   - Check SMTP credentials
   - For Gmail, use App Password instead of regular password

3. **Module not found**
   - Run `pnpm install` again
   - Clear node_modules and reinstall

4. **Docker issues**
   - Run `docker-compose down -v` to remove volumes
   - Rebuild with `docker-compose up --build`

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run tests and linting
4. Commit with meaningful messages
5. Push and create a Pull Request

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Turborepo Handbook](https://turbo.build/repo/docs)
- [pnpm Workspace](https://pnpm.io/workspaces)
