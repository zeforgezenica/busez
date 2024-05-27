import React, { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Station } from "../models/station.model";
import { City } from "../models/city.model";
import StationService from "../services/station.service";

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
    coordinates: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setStationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCitySelect = (selectedOption: any): void => {
    setStationData((prevData) => ({
      ...prevData,
      cityId: selectedOption.value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const newStation = await StationService.post(stationData as Station);
      console.log("Station added successfully!", newStation);
      setStationData({
        cityId: "",
        name: "",
        coordinates: "",
      });
      onStationAdded(newStation);
    } catch (error) {
      console.error("Error adding station:", error);
    }
  };

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
      <h2 className="text-xl mb-2">Add New Station</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="stationCity">City:</label>
          <Select
            id="stationCity"
            name="cityId"
            options={cities.map((city) => ({
              value: city._id,
              label: city.name,
            }))}
            onChange={handleCitySelect}
            placeholder="Select City"
            styles={customSelectStyles}
          />
        </div>
        <div>
          <label htmlFor="stationName">Name:</label>
          <Input
            id="stationName"
            name="name"
            value={stationData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="stationCoordinates">Coordinates (optional):</label>
          <Input
            id="stationCoordinates"
            name="coordinates"
            value={stationData.coordinates || ""}
            onChange={handleInputChange}
          />
        </div>
        <Button onClick={handleSubmit}>Add Station</Button>
      </div>
    </Card>
  );
};

export default StationForm;
