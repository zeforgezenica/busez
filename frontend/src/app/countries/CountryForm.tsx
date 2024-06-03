import React, { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import { Country } from "../models/country.model";
import { handleCountrySubmit } from "../handlers/country.form.handler";

interface CountryFormProps {
  onCountryAdded: (country: Country) => void;
}

const CountryForm: React.FC<CountryFormProps> = ({ onCountryAdded }) => {
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState<number | "">("");
  const [countryAcronym, setCountryAcronym] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleCountrySubmit(
      countryName,
      countryCode,
      countryAcronym,
      onCountryAdded,
      setCountryName,
      setCountryCode,
      setCountryAcronym
    );
  };

  return (
    <Card shadow="sm" className="p-6 mb-4">
      <h2 className="text-xl mb-2">Add New Country</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="countryName" className="block mb-1">
            Name:
          </label>
          <Input
            id="countryName"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            fullWidth
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="countryCode" className="block mb-1">
              Code:
            </label>
            <Input
              id="countryCode"
              type="number"
              value={countryCode.toString()}
              onChange={(e) => setCountryCode(e.target.valueAsNumber || "")}
              fullWidth
            />
          </div>
          <div className="flex-1">
            <label htmlFor="countryAcronym" className="block mb-1">
              Acronym:
            </label>
            <Input
              id="countryAcronym"
              value={countryAcronym}
              onChange={(e) => setCountryAcronym(e.target.value)}
              fullWidth
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default CountryForm;
