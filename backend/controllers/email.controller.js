const nodemailer = require("nodemailer");
const logger = require("../utils/logger");
require("dotenv").config();

class EmailController {
  async sendEmail(req, res) {
    // Check if email functionality is enabled
    if (process.env.ENABLE_EMAIL !== "true") {
      return res
        .status(503)
        .json({ 
          error: "Email functionality is currently disabled. Please contact the administrator.",
          code: "EMAIL_DISABLED"
        });
    }

    const { subject, text, senderName, senderEmail } = req.body;

    if (!subject || !text || !senderName) {
      return res
        .status(400)
        .json({ error: "Subject, text, and sender name are required." });
    }

    try {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: `${senderName} <${senderEmail || process.env.SENDER_EMAIL}>`,
        to: `${process.env.DEFAULT_RECEIVER_NAME} <${process.env.DEFAULT_RECEIVER_EMAIL}>`,
        subject: subject,
        text: text,
      };

      const info = await transporter.sendMail(mailOptions);

      logger.info(`Email sent successfully: ${info.response}`);
      res
        .status(200)
        .json({ success: "Email sent successfully.", result: info });
    } catch (error) {
      logger.error(`Error caught: ${error.message}`);
      let errorMessage = "An error occurred while sending the email.";
      if (error.code === "EAUTH") {
        errorMessage = "Authentication failed. Check your SMTP credentials.";
      } else if (error.responseCode === 404) {
        errorMessage = "SMTP service not found. Check your API configuration.";
      } else if (error.responseCode >= 500) {
        errorMessage = "Server error. Please try again later.";
      }
      res.status(error.responseCode || 500).json({ error: errorMessage });
    }
  }
}

module.exports = new EmailController();
