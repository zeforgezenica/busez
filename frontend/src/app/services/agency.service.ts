import BaseService from "./base.service";
import { Agency } from "../models/agency.model";

class AgencyService extends BaseService<Agency> {
  constructor() {
    super("/agencies/");
  }

  async getAgencies(): Promise<Agency[]> {
    return this.get();
  }

  async getAgency(id: string): Promise<Agency> {
    return this.getById(id);
  }

  async getAgenciesById(ids: string[]): Promise<Agency[]> {
    return this.getByIds(ids);
  }
}

const agencyServiceInstance = new AgencyService();

export default agencyServiceInstance;
