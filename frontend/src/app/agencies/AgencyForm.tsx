import React, { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Agency } from "../models/agency.model";
import { City } from "../models/city.model";
import {
  handleInputChange,
  handleCitySelect,
  handleSubmit,
} from "../handlers/agency.form.handler";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface AgencyFormProps {
  cities: City[];
  onAgencyAdded: () => void;
}

const AgencyForm: React.FC<AgencyFormProps> = ({ cities, onAgencyAdded }) => {
  const [agencyData, setAgencyData] = useState<Partial<Agency>>({
    cityId: "",
    name: "",
    address: "",
    website: "",
    email: "",
    phoneNumber: "",
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
      <h2 className="text-xl mb-2">Add New Agency</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="agencyCity">City:</label>
          <Select
            id="agencyCity"
            name="cityId"
            options={cities.map((city) => ({
              value: city._id,
              label: city.name,
            }))}
            onChange={(selectedOption) =>
              handleCitySelect(selectedOption, setAgencyData)
            }
            placeholder="Select City"
            styles={customSelectStyles}
            key={cities.length} // Use key to force re-rendering
          />
        </div>
        <div>
          <label htmlFor="agencyName">Name:</label>
          <Input
            id="agencyName"
            name="name"
            value={agencyData.name}
            onChange={(e) => handleInputChange(e, setAgencyData)}
          />
        </div>
        <div>
          <label htmlFor="agencyAddress">Address:</label>
          <Input
            id="agencyAddress"
            name="address"
            value={agencyData.address}
            onChange={(e) => handleInputChange(e, setAgencyData)}
          />
        </div>
        <div>
          <label htmlFor="agencyWebsite">Website (optional):</label>
          <Input
            id="agencyWebsite"
            name="website"
            value={agencyData.website || ""}
            onChange={(e) => handleInputChange(e, setAgencyData)}
          />
        </div>
        <div>
          <label htmlFor="agencyEmail">Email (optional):</label>
          <Input
            id="agencyEmail"
            name="email"
            value={agencyData.email || ""}
            onChange={(e) => handleInputChange(e, setAgencyData)}
          />
        </div>
        <div>
          <label htmlFor="agencyPhoneNumber">Phone Number (optional):</label>
          <Input
            id="agencyPhoneNumber"
            name="phoneNumber"
            value={agencyData.phoneNumber || ""}
            onChange={(e) => handleInputChange(e, setAgencyData)}
          />
        </div>
        <Button
          onClick={() => handleSubmit(agencyData, setAgencyData, onAgencyAdded)}
        >
          Add Agency
        </Button>
      </div>
    </Card>
  );
};

export default AgencyForm;
