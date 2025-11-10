const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const logger = require("./utils/logger");
const validateEnv = require("./utils/validateEnv");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const { apiLimiter, emailLimiter } = require("./middleware/rateLimiter");
const swaggerSpec = require("./config/swagger");

// Validate environment variables
try {
  validateEnv();
} catch (error) {
  logger.error("Failed to start server due to environment validation error");
  process.exit(1);
}

const countryRoutes = require("./routes/country.routes");
const cityRoutes = require("./routes/city.routes");
const agencyRoutes = require("./routes/agency.routes");
const stationRoutes = require("./routes/station.routes");
const routeRoutes = require("./routes/route.routes");
const emailRoutes = require("./routes/email.routes");

// Security middleware
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Apply rate limiting to all routes
app.use(apiLimiter);

// API Documentation (configurable via ENABLE_API_DOCS environment variable)
// Default: enabled in all environments unless explicitly disabled
const enableApiDocs = process.env.ENABLE_API_DOCS !== "false";

if (enableApiDocs) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    customSiteTitle: "Busez API Documentation",
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: "none",
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  }));
  logger.info(`Swagger documentation enabled and available at /api-docs (NODE_ENV: ${process.env.NODE_ENV})`);
} else {
  logger.info("Swagger documentation disabled via ENABLE_API_DOCS=false");
}

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     description: Check if the API server is running and healthy
 *     responses:
 *       200:
 *         description: Server is healthy and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-26T21:35:43.000Z"
 */
// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/countries", countryRoutes);
app.use("/cities", cityRoutes);
app.use("/agencies", agencyRoutes);
app.use("/stations", stationRoutes);
app.use("/routes", routeRoutes);
app.use("/sendEmail", emailLimiter, emailRoutes);

// 404 handler - must be after all routes
app.use(notFound);

// Error handler - must be last
app.use(errorHandler);

app.use((req, res, _next) => {
  res.status(404).send({message: "Route Not Found"});
});

app.use((err, req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).send({message: "internal server error"});
});

const port = 3001;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
