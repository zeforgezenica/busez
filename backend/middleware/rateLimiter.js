const rateLimit = require("express-rate-limit");

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Email endpoint rate limiter (stricter)
const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 email requests per hour
  message: "Too many emails sent from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Authentication rate limiter (if you add auth later)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 failed auth attempts per windowMs
  skipSuccessfulRequests: true,
  message: "Too many authentication attempts, please try again later.",
});

module.exports = {
  apiLimiter,
  emailLimiter,
  authLimiter,
};
