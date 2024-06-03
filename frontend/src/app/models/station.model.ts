import { LatLngExpression } from "leaflet";

export interface Station {
  _id?: string;
  cityId: string;
  name: string;
  coordinates?: LatLngExpression;
}

export default Station;
