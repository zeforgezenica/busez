export interface Route {
  _id: number;
  name: string;
  agency: string;
  destination: Array<{
    stationId: String;
    time: String[];
    returnTime: String[];
  }>;
}

export default Route;
