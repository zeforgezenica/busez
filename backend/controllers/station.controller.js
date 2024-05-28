const BaseController = require("./base.controller");
const path = require("path");

class StationController extends BaseController {
  constructor() {
    const filePath = path.join(__dirname, "../../database/data/stations.json");
    const stationSchema = require("../schemas/station.schema.json");
    super(filePath, stationSchema);
  }
}

module.exports = new StationController();
