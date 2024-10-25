const request = require('supertest');
const express = require('express');
const fs = require('fs');
const cityRoutes = require('../routes/city.routes');
const app = express();

jest.mock('fs');

app.use(express.json());
app.use('/cities', cityRoutes);

describe('CityController', () => {
  let mockCities;

  beforeEach(() => {
    mockCities = [
      {
        "_id": "1",
        "countryId": "101",
        "name": "CityOne",
        "zipCode": 12345,
        "coordinates": [1.2345, 2.3456]
      },
      {
        "_id": "2",
        "countryId": "102",
        "name": "CityTwo",
        "zipCode": 67890,
        "coordinates": [3.4567, 4.5678]
      }
    ];

    fs.readFile.mockImplementation((filePath, encoding, callback) => {
      callback(null, JSON.stringify(mockCities));
    });

    fs.writeFile.mockImplementation((filePath, data, callback) => {
      callback(null);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all cities', async () => {
    const response = await request(app).get('/cities');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockCities);
  });

  it('should return a city by ID', async () => {
    const response = await request(app).get('/cities/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockCities[0]);
  });

  it('should return 404 if city not found', async () => {
    const response = await request(app).get('/cities/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' }); 
  });
});
