const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Busez API Documentation",
      version: "1.0.0",
      description: "API documentation for Zenica Bus Tracking Application",
      contact: {
        name: "ZeForge",
        url: "https://zeforge.ba",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
      {
        url: "https://api.kadjebus.zeforge.ba",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        Country: {
          type: "object",
          required: ["_id", "name"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier",
            },
            name: {
              type: "string",
              description: "Country name",
            },
          },
        },
        City: {
          type: "object",
          required: ["_id", "name", "countryId"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier",
            },
            name: {
              type: "string",
              description: "City name",
            },
            countryId: {
              type: "string",
              description: "Country ID reference",
            },
          },
        },
        Agency: {
          type: "object",
          required: ["_id", "cityId"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier",
            },
            cityId: {
              type: "string",
              description: "City ID reference",
            },
            address: {
              type: "string",
              description: "Agency address",
            },
            website: {
              type: "string",
              description: "Agency website URL",
            },
            email: {
              type: "string",
              format: "email",
              description: "Agency email",
            },
            phoneNumber: {
              type: "string",
              description: "Agency phone number",
            },
          },
        },
        Station: {
          type: "object",
          required: ["_id", "name", "cityId"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier",
            },
            name: {
              type: "string",
              description: "Station name",
            },
            cityId: {
              type: "string",
              description: "City ID reference",
            },
            latitude: {
              type: "number",
              description: "Station latitude",
            },
            longitude: {
              type: "number",
              description: "Station longitude",
            },
          },
        },
        Route: {
          type: "object",
          required: ["_id", "name", "agencyId"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier",
            },
            name: {
              type: "string",
              description: "Route name/number",
            },
            agencyId: {
              type: "string",
              description: "Agency ID reference",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
