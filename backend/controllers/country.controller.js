const BaseController = require("./base.controller");
const path = require("path");

class CountryController extends BaseController {
  constructor() {
    const filePath = path.join(__dirname, "../../database/data/countries.json");
    const countrySchema = require("../schemas/country.schema.json");
    super(filePath, countrySchema);
  }
}

module.exports = new CountryController();
