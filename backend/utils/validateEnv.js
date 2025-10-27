const Joi = require("joi");
const logger = require("./logger");

// Helper function to create conditional SMTP field validation
const conditionalSMTP = (requiredSchema, optionalSchema = Joi.string().optional()) => {
  return Joi.when("ENABLE_EMAIL", {
    is: "true",
    then: requiredSchema,
    otherwise: optionalSchema
  });
};

const envSchema = Joi.object({
  // SMTP Configuration (Optional - only required if ENABLE_EMAIL is true)
  ENABLE_EMAIL: Joi.string().valid("true", "false").default("false").description("Enable email functionality"),
  SMTP_HOST: conditionalSMTP(
    Joi.string().required().description("SMTP server host"),
    Joi.string().optional().description("SMTP server host")
  ),
  SMTP_PORT: conditionalSMTP(
    Joi.number().required().description("SMTP server port"),
    Joi.alternatives().try(Joi.number(), Joi.string()).optional().description("SMTP server port")
  ),
  SMTP_USER: conditionalSMTP(
    Joi.string().email().required().description("SMTP user email"),
    Joi.string().optional().description("SMTP user email")
  ),
  SMTP_PASS: conditionalSMTP(
    Joi.string().required().description("SMTP password"),
    Joi.string().optional().description("SMTP password")
  ),
  SENDER_EMAIL: conditionalSMTP(
    Joi.string().email().required().description("Email sender address"),
    Joi.string().optional().description("Email sender address")
  ),
  DEFAULT_RECEIVER_EMAIL: conditionalSMTP(
    Joi.string().email().required().description("Default receiver email"),
    Joi.string().optional().description("Default receiver email")
  ),
  DEFAULT_RECEIVER_NAME: conditionalSMTP(
    Joi.string().required().description("Default receiver name"),
    Joi.string().optional().description("Default receiver name")
  ),

  // Server Configuration
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
  PORT: Joi.number().default(3001),
  LOG_LEVEL: Joi.string()
    .valid("error", "warn", "info", "http", "verbose", "debug", "silly")
    .default("info"),
  ENABLE_API_DOCS: Joi.string().valid("true", "false").default("true").description("Enable Swagger API documentation"),
})
  .unknown(true)
  .required();

/**
 * Validates environment variables required for the application.
 * 
 * Email functionality is OPTIONAL and disabled by default. To enable email functionality:
 * 1. Set ENABLE_EMAIL=true in your .env file
 * 2. Configure all SMTP settings (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SENDER_EMAIL, etc.)
 * 
 * For testing email functionality, ensure all SMTP environment variables are properly configured
 * before running tests with ENABLE_EMAIL=true. This prevents build failures when SMTP details
 * are not available.
 */
const validateEnv = () => {
  const { error, value } = envSchema.validate(process.env, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message).join(", ");
    logger.error(`Environment validation failed: ${errors}`);
    throw new Error(`Environment validation failed: ${errors}`);
  }

  logger.info("Environment variables validated successfully");
  return value;
};

module.exports = validateEnv;
