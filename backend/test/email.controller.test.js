const request = require("supertest");
const express = require("express");
const EmailController = require("../controllers/email.controller");
const nodemailer = require("nodemailer");

jest.mock("nodemailer");

const app = express();
app.use(express.json()); 

app.post("/email", EmailController.sendEmail);

describe("EmailController", () => {
  let transporterMock;

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});  
    jest.spyOn(console, 'error').mockImplementation(() => {});  
  });
  
  afterAll(() => {
    console.log.mockRestore();  
    console.error.mockRestore(); 
  });

  beforeEach(() => {
    transporterMock = {
      sendMail: jest.fn().mockResolvedValue({
        response: "250 OK: message queued",
      }),
    };
    nodemailer.createTransport.mockReturnValue(transporterMock);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it("should send an email successfully with valid input", async () => {
    const validPayload = {
      subject: "Test Subject",
      text: "This is a test email body.",
      senderName: "John Doe",
      senderEmail: "john@example.com",
    };

    const response = await request(app)
      .post("/email")
      .send(validPayload);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("success", "Email sent successfully.");
    expect(transporterMock.sendMail).toHaveBeenCalledTimes(1);
    expect(transporterMock.sendMail).toHaveBeenCalledWith({
      from: "John Doe <john@example.com>",
      to: `${process.env.DEFAULT_RECEIVER_NAME} <${process.env.DEFAULT_RECEIVER_EMAIL}>`,
      subject: "Test Subject",
      text: "This is a test email body.",
    });
  });

  
  it("should return a 400 error if required fields are missing", async () => {
    const invalidPayload = {
      text: "This is a test email body.", 
    };

    const response = await request(app)
      .post("/email")
      .send(invalidPayload);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Subject, text, and sender name are required."
    );
    expect(transporterMock.sendMail).not.toHaveBeenCalled();
  });

  it("should return an authentication error if SMTP credentials are invalid", async () => {
    transporterMock.sendMail.mockRejectedValue({
      code: "EAUTH",
      message: "Invalid login credentials",
    });

    const validPayload = {
      subject: "Test Subject",
      text: "This is a test email body.",
      senderName: "John Doe",
      senderEmail: "john@example.com",
    };

    const response = await request(app)
      .post("/email")
      .send(validPayload);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty(
      "error",
      "Authentication failed. Check your SMTP credentials."
    );
    expect(transporterMock.sendMail).toHaveBeenCalledTimes(1);
  });

  it("should return 404 error if SMTP service is not found", async () => {
    transporterMock.sendMail.mockRejectedValue({
      responseCode: 404,
      message: "SMTP service not found",
    });

    const validPayload = {
      subject: "Test Subject",
      text: "This is a test email body.",
      senderName: "John Doe",
      senderEmail: "john@example.com",
    };

    const response = await request(app)
      .post("/email")
      .send(validPayload);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "error",
      "SMTP service not found. Check your API configuration."
    );
    expect(transporterMock.sendMail).toHaveBeenCalledTimes(1);
  });

  it("should return 500 error for server-related issues", async () => {
    transporterMock.sendMail.mockRejectedValue({
      responseCode: 500,
      message: "Internal server error",
    });

    const validPayload = {
      subject: "Test Subject",
      text: "This is a test email body.",
      senderName: "John Doe",
      senderEmail: "john@example.com",
    };

    const response = await request(app)
      .post("/email")
      .send(validPayload);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty(
      "error",
      "Server error. Please try again later."
    );
    expect(transporterMock.sendMail).toHaveBeenCalledTimes(1);
  });
});
