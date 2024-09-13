import Weekdays from "./weekdays.model";

export enum RouteType {
  Intercity = 1,
  International = 2,
  Local = 3,
}

export interface StationTimes {
  stationId: string;
  departureTime: string[];
  returnTime: string[];
}

export interface Route {
  _id?: string;
  agencyId: string;
  name: string;
  type: RouteType;
  activeDays: Weekdays;
  returnDays?: Weekdays;
  stations: StationTimes[];
  duration?: string;
}

export interface StationTime {
  stationId: string;
  time: string;
}

export interface RouteLap {
  _id?: string;
  agencyId: string;
  name: string;
  type: RouteType;
  activeDays: Weekdays;
  returnDays?: Weekdays;
  stations: StationTime[];
  duration?: string;
}

export default Route;
