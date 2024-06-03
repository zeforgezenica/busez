import { City } from "../models/city.model";
import CityService from "../services/city.service";
import React from "react";

export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setCityData: React.Dispatch<React.SetStateAction<Partial<City>>>
): void => {
  const { name, value } = event.target;
  setCityData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleCountrySelect = (
  selectedOption: any,
  setCityData: React.Dispatch<React.SetStateAction<Partial<City>>>
): void => {
  setCityData((prevData) => ({
    ...prevData,
    countryId: selectedOption.value,
  }));
};

export const handleSubmit = async (
  cityData: Partial<City>,
  setCityData: React.Dispatch<React.SetStateAction<Partial<City>>>,
  onCityAdded: () => void
): Promise<void> => {
  try {
    await CityService.post(cityData as City);
    console.log("City added successfully!");
    setCityData({
      countryId: "",
      name: "",
      zipCode: 0,
      coordinates: "",
    });
    onCityAdded();
  } catch (error) {
    console.error("Error adding city:", error);
  }
};
