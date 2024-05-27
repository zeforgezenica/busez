export interface City {
  _id?: string;
  countryId: string;
  name: string;
  zipCode: number;
  coordinates?: string;
}

export default City;
