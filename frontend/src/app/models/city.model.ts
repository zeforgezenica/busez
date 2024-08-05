import { LatLngExpression } from "leaflet";

export interface City {
  _id?: string;
  countryId: string;
  name: string;
  zipCode: number;
  coordinates?: LatLngExpression;
}

export default City;
