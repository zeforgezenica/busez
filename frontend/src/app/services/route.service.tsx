import BaseService from "./base.service";
import { Route } from "../models/route.model";

class RouteService extends BaseService<Route> {
  constructor() {
    super("/routes/");
  }

  getRoutes(): Promise<Route[]> {
    return this.get();
  }

  async getRoute(id: string): Promise<Route> {
    return this.getById(id);
  }

  async getRoutesById(ids: string[]): Promise<Route[]> {
    return this.getByIds(ids);
  }
}

const routeServiceInstance = new RouteService();

export default routeServiceInstance;
