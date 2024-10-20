const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailController {
  constructor() {
    // Set up reCAPTCHA with your site key and secret key
    this.recaptcha = new RecaptchaV2(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY);

    // Set up rate limiter: max 5 requests per hour
    this.emailLimiter = rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 5, // limit each IP to 5 email requests per hour
      message: 'Too many emails sent from this IP, please try again after an hour',
    });
  }

  async sendEmail(req, res) {
    const { subject, text, senderName, senderEmail } = req.body;

    // First check reCAPTCHA
    if (!req.recaptcha.error) {
      if (!subject || !text || !senderName) {
        return res.status(400).json({ error: "Subject, text, and sender name are required." });
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

        console.log("Email sent successfully:", info.response);
        res.status(200).json({ success: "Email sent successfully.", result: info });
      } catch (error) {
        console.error("Error caught:", error.message);
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
    } else {
      return res.status(400).json({ error: "CAPTCHA verification failed." });
    }
  }
}

module.exports = new EmailController();
