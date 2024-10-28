const fs = require('fs');
const path = require('path');
const AgencyController = require('../controllers/agency.controller');
const request = require('supertest');
const express = require('express');


jest.mock('fs');
jest.mock('ajv');


const app = express();
app.use(express.json());
app.use("/agencies", require("../routes/agency.routes"));

describe("AgencyController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("should return all agencies", async () => {
   
    fs.readFile.mockImplementation((filePath, encoding, callback) => {
      callback(null, JSON.stringify([{ _id: "1", cityId: "123", address: "123 Street", website: "https://example.com", email: "test@example.com", phoneNumber: "+123456789" }]));
    });

    const response = await request(app).get("/agencies");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { _id: "1", cityId: "123", address: "123 Street", website: "https://example.com", email: "test@example.com", phoneNumber: "+123456789" }
    ]);
  });

  
  it("should return an agency by id", async () => {
    fs.readFile.mockImplementation((filePath, encoding, callback) => {
      callback(null, JSON.stringify([{ _id: "1", cityId: "123", address: "123 Street", website: "https://example.com", email: "test@example.com", phoneNumber: "+123456789" }]));
    });

    const response = await request(app).get("/agencies/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      _id: "1", cityId: "123", address: "123 Street", website: "https://example.com", email: "test@example.com", phoneNumber: "+123456789"
    });
  });
});
