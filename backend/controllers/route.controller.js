const BaseController = require("./base.controller");
const path = require("path");

class RouteController extends BaseController {
  constructor() {
    const filePath = path.join(__dirname, "../../database/data/routes.json");
    const routeSchema = require("../schemas/route.schema.json");
    super(filePath, routeSchema);
  }
}

module.exports = new RouteController();
