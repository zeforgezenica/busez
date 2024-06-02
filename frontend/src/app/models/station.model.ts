import { LatLngExpression } from "leaflet";

export interface Station {
  _id?: string;
  cityId: string;
  name: string;
  coordinates?: LatLngExpression | undefined;
}

export default Station;
