const fs = require("fs");
const BaseController = require("./base.controller");
const path = require("path");

class StationController extends BaseController {
  constructor() {
    const filePath = path.join(__dirname, "../../database/data/stations.json");
    const stationSchema = require("../schemas/station.schema.json");
    super(filePath, stationSchema);

    this.getAllConnections = this.getAllConnections.bind(this);
    this.doStationsConnect = this.doStationsConnect.bind(this);
    this.readFromFileRelationships = this.readFromFileRelationships.bind(this);
    this.getStationsByConnection = this.getStationsByConnection.bind(this);
  }

  async readFromFileRelationships() {
    return new Promise((resolve, reject) => {
      const relationshipsPath = path.join(
        __dirname,
        "../../database/data/stationRelationships.json"
      );
      fs.readFile(relationshipsPath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  async getAllConnections(req, res) {
    const stationId = req.params.id;

    try {
      const relationships = await this.readFromFileRelationships();

      const connections = relationships
        .filter((rel) => rel.stationA === stationId)
        .map((rel) => rel.stationB);

      res.status(200).json(connections);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error retrieving connections." });
    }
  }

  async getStationsByConnection(req, res) {
    const stationId = req.params.id;

    try {
      const relationships = await this.readFromFileRelationships();

      const connectionIds = relationships
        .filter((rel) => rel.stationA === stationId)
        .map((rel) => rel.stationB);

      const allStations = await this.readFromFile();

      const connectedStations = allStations.filter((station) =>
        connectionIds.includes(station._id)
      );

      res.status(200).json(connectedStations);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error retrieving connected stations." });
    }
  }

  async doStationsConnect(req, res) {
    const { stationAId, stationBId } = req.params;

    try {
      const relationships = await this.readFromFileRelationships();

      const exists = relationships.some(
        (rel) => rel.stationA === stationAId && rel.stationB === stationBId
      );

      res.status(200).json({ connected: exists });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error checking connection." });
    }
  }
}

module.exports = new StationController();
