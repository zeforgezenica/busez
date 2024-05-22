const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const cors = require("cors"); // CORS middleware

const routes = require("./routes");

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Universal route handler function
for (const [route, filePath] of Object.entries(routes)) {
  app
    .route(route)
    .get((req, res) => {
      res.sendFile(path.join(__dirname, filePath));
    })
    .post((req, res) => {
      // Handle POST request for the route
      res.send(`POST request received for ${route}`);
    })
    .put((req, res) => {
      // Handle PUT request for the route
      res.send(`PUT request received for ${route}`);
    })
    .delete((req, res) => {
      // Handle DELETE request for the route
      res.send(`DELETE request received for ${route}`);
    });
}

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
