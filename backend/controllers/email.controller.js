const Mailjet = require("node-mailjet");
require("dotenv").config();

class EmailController {
  async sendEmail(req, res) {
    const { subject, text, senderName, senderEmail } = req.body;

    if (!subject || !text || !senderName) {
      return res
        .status(400)
        .json({ error: "Subject, text, and sender name are required." });
    }

    try {
      const mailjetClient = new Mailjet({
        apiKey: process.env.MAILJET_API_KEY,
        apiSecret: process.env.MAILJET_API_SECRET,
      });

      const request = mailjetClient.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: senderEmail || process.env.SENDER_EMAIL,
              Name: senderName,
            },
            To: [
              {
                Email: process.env.DEFAULT_RECEIVER_EMAIL,
                Name: process.env.DEFAULT_RECEIVER_NAME,
              },
            ],
            Subject: subject,
            TextPart: text,
          },
        ],
      });

      const result = await request;

      const cleanResult = {
        status: result.body.Messages[0].Status,
        to: result.body.Messages[0].To,
      };

      console.log("Email sent successfully:", cleanResult);
      res
        .status(200)
        .json({ success: "Email sent successfully.", result: cleanResult });
    } catch (error) {
      console.error("Error caught:", error.message);
      let errorMessage = "An error occurred while sending the email.";
      if (error.statusCode === 401) {
        errorMessage = "Authentication failed. Check your Mailjet credentials.";
      } else if (error.statusCode === 404) {
        errorMessage =
          "Mailjet service not found. Check your API configuration.";
      } else if (error.statusCode >= 500) {
        errorMessage = "Server error. Please try again later.";
      }
      res.status(error.statusCode || 500).json({ error: errorMessage });
    }
  }
}

module.exports = new EmailController();
