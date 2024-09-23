import BaseService from "./base.service";
import { City } from "../models/city.model";

class CityService extends BaseService<City> {
  constructor() {
    super("/cities/");
  }

  async getCities(): Promise<City[]> {
    return this.get();
  }

  async getCity(id: string): Promise<City> {
    return this.getById(id);
  }

  async getCitiesByIds(ids: string[]): Promise<City[]> {
    return this.getByIds(ids);
  }
}

const cityServiceInstance = new CityService();

export default cityServiceInstance;
