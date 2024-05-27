const BaseController = require("./base.controller");
const path = require("path");

class AgencyController extends BaseController {
  constructor() {
    const filePath = path.join(__dirname, "../../database/data/agencies.json");
    const agencySchema = require("../schemas/agency.schema.json");
    super(filePath, agencySchema);
  }
}

module.exports = new AgencyController();
