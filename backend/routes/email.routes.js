const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/email.controller");

/**
 * @swagger
 * tags:
 *   name: Email
 *   description: Email communication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailRequest:
 *       type: object
 *       required:
 *         - subject
 *         - text
 *         - senderName
 *       properties:
 *         subject:
 *           type: string
 *           description: Email subject line
 *           example: "Bus Route Inquiry"
 *         text:
 *           type: string
 *           description: Email message body
 *           example: "I would like to know more about the bus routes in Zenica."
 *         senderName:
 *           type: string
 *           description: Name of the person sending the email
 *           example: "John Doe"
 *         senderEmail:
 *           type: string
 *           format: email
 *           description: Email address of the sender (optional, will use default if not provided)
 *           example: "john.doe@example.com"
 *     EmailResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: string
 *           description: Success message
 *           example: "Email sent successfully."
 *         result:
 *           type: object
 *           description: Email delivery result from SMTP server
 *     EmailDisabledResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: "Email functionality is currently disabled. Please contact the administrator."
 *         code:
 *           type: string
 *           description: Error code
 *           example: "EMAIL_DISABLED"
 */

/**
 * @swagger
 * /sendEmail:
 *   post:
 *     summary: Send an email
 *     tags: [Email]
 *     description: |
 *       Send an email message through the application. 
 *       
 *       **Note**: Email functionality must be enabled by setting `ENABLE_EMAIL=true` in the environment configuration.
 *       If email functionality is disabled, this endpoint will return a 503 error.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailRequest'
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailResponse'
 *       400:
 *         description: Bad request - missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Subject, text, and sender name are required."
 *       503:
 *         description: Service unavailable - email functionality disabled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailDisabledResponse'
 *       500:
 *         description: Internal server error - SMTP configuration or delivery issues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication failed. Check your SMTP credentials."
 */
router.post("/", EmailController.sendEmail);

module.exports = router;
