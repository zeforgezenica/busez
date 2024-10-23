const request = require("supertest");
const express = require("express");
const fs = require("fs");
const RouteController = require("../controllers/route.controller");
const routeRoutes = require("../routes/route.routes"); 

jest.mock("fs");

const app = express();
app.use(express.json());
app.use("/routes", routeRoutes); 

describe("RouteController", () => {
  let routesData;

  beforeEach(() => {
    routesData = [
      {
        _id: "1",
        agencyId: "123",
        name: "Route 1",
        type: 1,
        activeDays: {
          sunday: true,
          monday: false,
          tuesday: true,
          wednesday: false,
          thursday: true,
          friday: false,
          saturday: true,
        },
        stations: [
          {
            stationId: "station1",
            departureTime: ["10:00", "12:00"],
            returnTime: ["15:00", "17:00"],
          },
        ],
        duration: "2 hours",
      },
      {
        _id: "2",
        agencyId: "124",
        name: "Route 2",
        type: 2,
        activeDays: {
          sunday: true,
          monday: true,
          tuesday: false,
          wednesday: true,
          thursday: false,
          friday: true,
          saturday: false,
        },
        stations: [
          {
            stationId: "station2",
            departureTime: ["08:00", "09:00"],
            returnTime: ["18:00", "19:00"],
          },
        ],
        duration: "1.5 hours",
      },
    ];

    fs.readFile.mockImplementation((filePath, encoding, callback) => {
        callback(null, JSON.stringify(routesData));
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all routes", async () => {
      const response = await request(app).get("/routes");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(routesData);
  });

  it("should return a route by id", async () => {
    
    const response = await request(app).get(`/routes/1`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(routesData[0]);
  });

  it("should return 404 if route not found", async () => {
    const routeId = "nonexistent";

    const response = await request(app).get(`/routes/${routeId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Item not found",
    });
  });
});
