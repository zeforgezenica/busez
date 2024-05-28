const BaseController = require("./base.controller");
const path = require("path");

class CityController extends BaseController {
  constructor() {
    const filePath = path.join(__dirname, "../../database/data/cities.json");
    const citySchema = require("../schemas/city.schema.json");
    super(filePath, citySchema);
  }
}

module.exports = new CityController();
