import BaseService from "./base.service";
import { Station } from "../models/station.model";

class StationService extends BaseService<Station> {
  constructor() {
    super("/stations/");
  }

  async getStations(): Promise<Station[]> {
    return this.get();
  }

  async getStation(id: string): Promise<Station> {
    return this.getById(id);
  }

  async getStationsByIds(ids: string[]): Promise<Station[]> {
    return this.getByIds(ids);
  }
}

const stationServiceInstance = new StationService();

export default stationServiceInstance;
