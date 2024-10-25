const request = require('supertest');
const express = require('express');
const fs = require('fs');
const countryRoutes = require('../routes/country.routes'); 
const app = express();

jest.mock('fs');

app.use(express.json());

app.use('/countries', countryRoutes); 

describe('CountryController', () => {
  const mockCountries = [
    { _id: '1', name: 'Country1', code: '001', acronym: 'C1' },
    { _id: '2', name: 'Country2', code: '002', acronym: 'C2' },
  ];

  beforeEach(() => {
    fs.readFile.mockImplementation((filePath, encoding, callback) => {
      callback(null, JSON.stringify(mockCountries));
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should return all countries', async () => {
    const response = await request(app).get('/countries');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockCountries);
  });

  it('should return a country by id', async () => {
    const response = await request(app).get('/countries/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockCountries[0]);
  });

  it('should return 404 if country not found', async () => {
    const response = await request(app).get('/countries/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });
});
