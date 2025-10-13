const express = require("express");
const app = express();
const bodyParser = require("body-parser");
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

var countryRoutes = require("./routes/country.routes");
var cityRoutes = require("./routes/city.routes");
var agencyRoutes = require("./routes/agency.routes");
var stationRoutes = require("./routes/station.routes");
var routeRoutes = require("./routes/route.routes");
var emailRoutes = require("./routes/email.routes");

// Security middleware
app.use(helmet());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

// Apply rate limiting to all routes
app.use(apiLimiter);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

const port = 3001;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
