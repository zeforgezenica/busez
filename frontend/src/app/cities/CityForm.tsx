import React, { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import Select from "react-select";
import { City } from "../models/city.model";
import { Country } from "../models/country.model";
import {
  handleInputChange,
  handleCountrySelect,
  handleSubmit,
} from "../handlers/city.form.handler";

interface CityFormProps {
  countries: Country[];
  onCityAdded: () => void;
}

const CityForm: React.FC<CityFormProps> = ({ countries, onCityAdded }) => {
  const [cityData, setCityData] = useState<Partial<City>>({
    countryId: "",
    name: "",
    zipCode: 0,
    coordinates: "",
  });

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      background: "#333",
      borderColor: "#666",
    }),
    option: (provided: any) => ({
      ...provided,
      background: "#333",
      color: "#ccc",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#fff",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#fff",
      textAlign: "center",
    }),
  };

  return (
    <Card shadow="sm" className="p-6 mb-4">
      <h2 className="text-xl mb-2">Add New City</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="cityCountry">Country:</label>
          <Select
            id="cityCountry"
            name="countryId"
            options={countries.map((country) => ({
              value: country._id,
              label: country.name,
            }))}
            onChange={(selectedOption) =>
              handleCountrySelect(selectedOption, setCityData)
            }
            placeholder="Select Country"
            styles={customSelectStyles}
          />
        </div>
        <div>
          <label htmlFor="cityName">Name:</label>
          <Input
            id="cityName"
            name="name"
            value={cityData.name}
            onChange={(e) => handleInputChange(e, setCityData)}
          />
        </div>
        <div>
          <label htmlFor="cityZipCode">Zip Code:</label>
          <Input
            id="cityZipCode"
            name="zipCode"
            type="number"
            value={cityData.zipCode ? cityData.zipCode.toString() : ""}
            onChange={(e) => handleInputChange(e, setCityData)}
          />
        </div>
        <div>
          <label htmlFor="cityCoordinates">Coordinates (optional):</label>
          <Input
            id="cityCoordinates"
            name="coordinates"
            value={cityData.coordinates || ""}
            onChange={(e) => handleInputChange(e, setCityData)}
          />
        </div>
        <Button
          onClick={() => handleSubmit(cityData, setCityData, onCityAdded)}
        >
          Add City
        </Button>
      </div>
    </Card>
  );
};

export default CityForm;
