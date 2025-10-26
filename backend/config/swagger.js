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
      }
    ],
    tags: [
      {
        name: "System",
        description: "System health and status endpoints"
      },
      {
        name: "Countries",
        description: "Country management operations"
      },
      {
        name: "Cities", 
        description: "City management operations"
      },
      {
        name: "Agencies",
        description: "Transportation agency management operations"
      },
      {
        name: "Stations",
        description: "Bus station and connection management operations"
      },
      {
        name: "Routes",
        description: "Bus route management operations"
      },
      {
        name: "Email",
        description: "Email communication operations"
      }
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
              example: "country-001"
            },
            name: {
              type: "string",
              description: "Country name",
              example: "Bosnia and Herzegovina"
            }
          }
        },
        City: {
          type: "object",
          required: ["_id", "name", "countryId"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier",
              example: "city-001"
            },
            name: {
              type: "string",
              description: "City name",
              example: "Zenica"
            },
            countryId: {
              type: "string",
              description: "Country ID reference",
              example: "country-001"
            }
          }
        },
        Agency: {
          type: "object",
          required: ["_id", "cityId"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier",
              example: "agency-001"
            },
            cityId: {
              type: "string",
              description: "City ID reference",
              example: "city-001"
            },
            name: {
              type: "string",
              description: "Agency name",
              example: "Zenica Transport"
            },
            address: {
              type: "string",
              description: "Agency address",
              example: "Trg Alije Izetbegovića 1, Zenica"
            },
            website: {
              type: "string",
              description: "Agency website URL",
              example: "https://zenicatransport.ba"
            },
            email: {
              type: "string",
              format: "email",
              description: "Agency email",
              example: "info@zenicatransport.ba"
            },
            phoneNumber: {
              type: "string",
              description: "Agency phone number",
              example: "+387 32 123 456"
            }
          }
        },
        Station: {
          type: "object",
          required: ["_id", "name", "cityId"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier",
              example: "station-001"
            },
            name: {
              type: "string",
              description: "Station name",
              example: "Centar"
            },
            cityId: {
              type: "string",
              description: "City ID reference",
              example: "city-001"
            },
            latitude: {
              type: "number",
              description: "Station latitude",
              example: 44.2076
            },
            longitude: {
              type: "number",
              description: "Station longitude",  
              example: 17.9076
            }
          }
        },
        Route: {
          type: "object",
          required: ["_id", "name", "agencyId"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier",
              example: "route-001"
            },
            name: {
              type: "string",
              description: "Route name/number",
              example: "Line 1A"
            },
            agencyId: {
              type: "string",
              description: "Agency ID reference",
              example: "agency-001"
            }
          }
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false
            },
            message: {
              type: "string",
              description: "Error message",
              example: "An error occurred while processing your request"
            }
          }
        }
      },
    },
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
