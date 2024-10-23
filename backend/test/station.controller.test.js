const request = require("supertest");
const express = require("express");
const fs = require("fs");
const stationRoutes = require("../routes/station.routes");
const app = express();

jest.mock("fs");

app.use(express.json());
app.use("/stations", stationRoutes);

describe("StationController and StationRelationshipController", () => {
  let mockStations;
  let mockRelationships;

  beforeEach(() => {
    mockStations = [
      {
        "_id": "station1",
        "cityId": "city1",
        "name": "Station 1",
        "coordinates": [12.9716, 77.5946],
      },
      {
        "_id": "station2",
        "cityId": "city1",
        "name": "Station 2",
        "coordinates": [12.2958, 76.6394],
      }
    ];

    mockRelationships = [
      { stationA: "station1", stationB: "station2" }
    ];

    fs.readFile.mockImplementation((filePath, encoding, callback) => {
      if (filePath.includes("stations.json")) {
        callback(null, JSON.stringify(mockStations));
      } else if (filePath.includes("stationRelationships.json")) {
        callback(null, JSON.stringify(mockRelationships));
      } else {
        callback(new Error("File not found"));
      }
    });

    fs.writeFile.mockImplementation((filePath, data, callback) => {
      callback(null);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all stations", async () => {
    const response = await request(app).get("/stations");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockStations);
  });

  it("should return a station by ID", async () => {
    const response = await request(app).get("/stations/station1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockStations[0]);
  });

  it("should return 404 if station not found", async () => {
    const response = await request(app).get("/stations/nonexistent");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Item not found" });
  });

  it("should return all stations connected to a specific station", async () => {
    const response = await request(app).get("/stations/station1/connections");
    const expectedConnectedStations = [mockStations[1]]; 
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedConnectedStations);
  });

  it("should return true if two stations are connected", async () => {
    const response = await request(app).get("/stations/connect/station1/station2");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ connected: true });
  });

  it("should return false if two stations are not connected", async () => {
    const response = await request(app).get("/stations/connect/station1/nonexistent");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ connected: false });
  });
});
