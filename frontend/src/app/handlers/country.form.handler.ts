import { Country } from "../models/country.model";
import CountryService from "../services/country.service";

export const handleCountrySubmit = async (
  countryName: string,
  countryCode: number | "",
  countryAcronym: string,
  onCountryAdded: (country: Country) => void,
  setCountryName: React.Dispatch<React.SetStateAction<string>>,
  setCountryCode: React.Dispatch<React.SetStateAction<number | "">>,
  setCountryAcronym: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  const newCountry: Omit<Country, "_id"> = {
    name: countryName,
    code: countryCode as number,
    acronym: countryAcronym,
  };

  try {
    const response = await CountryService.post(newCountry);
    console.log("Country added successfully:", response);
    onCountryAdded(response);
    setCountryName("");
    setCountryCode("");
    setCountryAcronym("");
  } catch (error) {
    console.error("Error creating country:", error);
  }
};
