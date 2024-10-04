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

  async getStationConnections(stationId: string): Promise<Station[]> {
    return this.getItems(`${stationId}/connections`);
  }

  async doStationsConnect(
    stationAId: string,
    stationBId: string
  ): Promise<boolean> {
    const response = await this.getItems(
      `/connect/${stationAId}/${stationBId}`
    );
    return response.length > 0;
  }
}

const stationServiceInstance = new StationService();

export default stationServiceInstance;
