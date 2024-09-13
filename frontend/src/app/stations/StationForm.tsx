import React, { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Station } from "../models/station.model";
import { City } from "../models/city.model";
import {
  handleInputChange,
  handleCitySelect,
  handleSubmit,
} from "../handlers/station.form.handler";
import { LatLngTuple } from "leaflet";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface StationFormProps {
  cities: City[];
  onStationAdded: (station: Station) => void;
}

const StationForm: React.FC<StationFormProps> = ({
  cities,
  onStationAdded,
}) => {
  const [stationData, setStationData] = useState<Partial<Station>>({
    cityId: "",
    name: "",
    coordinates: [0, 0] as LatLngTuple,
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
    setStationData((prevData) => ({
      ...prevData,
      coordinates: [latitude, (prevData.coordinates as LatLngTuple)[1]],
    }));
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const longitude = parseFloat(e.target.value);
    setStationData((prevData) => ({
      ...prevData,
      coordinates: [(prevData.coordinates as LatLngTuple)[0], longitude],
    }));
  };

  const getLatitude = (): string => {
    return (stationData.coordinates as LatLngTuple)?.[0]?.toString() ?? "";
  };

  const getLongitude = (): string => {
    return (stationData.coordinates as LatLngTuple)?.[1]?.toString() ?? "";
  };

  const handleFormSubmit = () => {
    const { cityId, name, coordinates } = stationData;
    if (!cityId || !name) {
      alert("Please fill out all fields.");
      return;
    }
    handleSubmit(stationData, setStationData, onStationAdded);
  };

  return (
    <Card shadow="sm" className="p-6 mb-4">
      <h2 className="text-xl mb-2">Add New Station</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <Select
            id="stationCity"
            name="cityId"
            options={cities.map((city) => ({
              value: city._id,
              label: city.name,
            }))}
            onChange={(selectedOption) =>
              handleCitySelect(selectedOption, setStationData)
            }
            placeholder="Select City"
            styles={customSelectStyles}
          />
        </div>
        <div>
          <Input
            id="stationName"
            name="name"
            label="Station name"
            placeholder="Please enter the station name"
            value={stationData.name || ""}
            onChange={(e) => handleInputChange(e, setStationData)}
          />
        </div>
        <div>
          <label htmlFor="coordinates">Coordinates:</label>
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
        <Button onClick={handleFormSubmit}>Add Station</Button>
      </div>
    </Card>
  );
};

export default StationForm;
