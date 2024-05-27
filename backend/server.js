const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

var countryRoutes = require("./routes/country.routes");
var cityRoutes = require("./routes/city.routes");
var agencyRoutes = require("./routes/agency.routes");
var stationRoutes = require("./routes/station.routes");
var routeRoutes = require("./routes/route.routes");

app.use(bodyParser.json());
app.use(cors());

app.use("/countries", countryRoutes);
app.use("/cities", cityRoutes);
app.use("/agencies", agencyRoutes);
app.use("/stations", stationRoutes);
app.use("/routes", routeRoutes);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
