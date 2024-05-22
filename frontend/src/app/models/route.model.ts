import Weekdays from "./weekdays.model";

export interface Route {
  _id: number;
  agencyId: number;
  name: string;
  activeDays: Weekdays;
  stations: Array<{
    stationId: number;
    departureTime: string[];
    returnTime: string[];
  }>;
  duration: string;
}

export interface InternationalRoute extends Route {
  returnDays: Weekdays;
}

export default Route;
