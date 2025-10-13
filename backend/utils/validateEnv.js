const Joi = require("joi");
const logger = require("./logger");

const envSchema = Joi.object({
  // SMTP Configuration
  SMTP_HOST: Joi.string().required().description("SMTP server host"),
  SMTP_PORT: Joi.number().required().description("SMTP server port"),
  SMTP_USER: Joi.string().email().required().description("SMTP user email"),
  SMTP_PASS: Joi.string().required().description("SMTP password"),
  SENDER_EMAIL: Joi.string().email().required().description("Email sender address"),
  DEFAULT_RECEIVER_EMAIL: Joi.string()
    .email()
    .required()
    .description("Default receiver email"),
  DEFAULT_RECEIVER_NAME: Joi.string().required().description("Default receiver name"),

  // Server Configuration
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
  PORT: Joi.number().default(3001),
  LOG_LEVEL: Joi.string()
    .valid("error", "warn", "info", "http", "verbose", "debug", "silly")
    .default("info"),
})
  .unknown(true)
  .required();

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
