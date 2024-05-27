import BaseService from "./base.service";
import { Country } from "../models/country.model";

class CountryService extends BaseService<Country> {
  constructor() {
    super("/countries/");
  }

  async getCountries(): Promise<Country[]> {
    return this.get();
  }

  async getCountry(id: string): Promise<Country> {
    return this.getById(id);
  }

  async getCountriesByIds(ids: string[]): Promise<Country[]> {
    return this.getByIds(ids);
  }
}

const countryServiceInstance = new CountryService();

export default countryServiceInstance;
