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
import { LatLngTuple, LatLngExpression } from "leaflet";

interface CityFormProps {
  countries: Country[];
  onCityAdded: () => void;
}

const CityForm: React.FC<CityFormProps> = ({ countries, onCityAdded }) => {
  const [cityData, setCityData] = useState<Partial<City>>({
    countryId: "",
    name: "",
    zipCode: 0,
    coordinates: [0, 0],
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

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const latitude = parseFloat(e.target.value);
    setCityData((prevData) => ({
      ...prevData,
      coordinates: [latitude, (prevData.coordinates as number[])[1]],
    }));
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const longitude = parseFloat(e.target.value);
    setCityData((prevData) => ({
      ...prevData,
      coordinates: [(prevData.coordinates as number[])[0], longitude],
    }));
  };

  const isCoordinatesValid = (
    coordinates: LatLngExpression
  ): coordinates is LatLngTuple => {
    return Array.isArray(coordinates) && coordinates.length === 2;
  };

  const getLatitude = (): string => {
    return cityData.coordinates
      ? (cityData.coordinates as number[])[0].toString()
      : "";
  };

  const getLongitude = (): string => {
    return cityData.coordinates
      ? (cityData.coordinates as number[])[1].toString()
      : "";
  };

  const handleFormSubmit = () => {
    const { countryId, name, zipCode, coordinates } = cityData;
    if (
      !countryId ||
      !name ||
      !zipCode ||
      zipCode === 0 ||
      !coordinates ||
      !isCoordinatesValid(coordinates) ||
      coordinates[0] === 0 ||
      coordinates[1] === 0
    ) {
      alert("Please fill out all fields.");
      return;
    }
    handleSubmit(cityData, setCityData, onCityAdded);
  };

  return (
    <Card shadow="sm" className="p-6 mb-4">
      <h2 className="text-xl mb-2">Add New City</h2>
      <div className="flex flex-col space-y-4">
        <div>
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
          <Input
            id="cityName"
            name="name"
            label="City Name"
            placeholder="Please enter the city name"
            value={cityData.name}
            onChange={(e) => handleInputChange(e, setCityData)}
          />
        </div>
        <div>
          <Input
            id="cityZipCode"
            name="zipCode"
            type="number"
            label="Zip Code"
            placeholder="Please enter the zip code"
            value={cityData.zipCode ? cityData.zipCode.toString() : ""}
            onChange={(e) => handleInputChange(e, setCityData)}
          />
        </div>
        <div>
          <label htmlFor="cityCoordinates">Coordinates</label>
          <div className="flex space-x-4">
            <Input
              type="number"
              step="any"
              label="Latitude"
              value={getLatitude()}
              onChange={handleLatitudeChange}
              required
            />
            <Input
              type="number"
              step="any"
              label="Longitude"
              value={getLongitude()}
              onChange={handleLongitudeChange}
              required
            />
          </div>
        </div>
        <Button onClick={handleFormSubmit}>Add City</Button>
      </div>
    </Card>
  );
};

export default CityForm;
