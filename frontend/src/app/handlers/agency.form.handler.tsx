import { Agency } from "../models/agency.model";
import AgencyService from "../services/agency.service";
import React from "react";

export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setAgencyData: React.Dispatch<React.SetStateAction<Partial<Agency>>>
): void => {
  const { name, value } = event.target;
  setAgencyData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleCitySelect = (
  selectedOption: any,
  setAgencyData: React.Dispatch<React.SetStateAction<Partial<Agency>>>
): void => {
  setAgencyData((prevData) => ({
    ...prevData,
    cityId: selectedOption.value,
  }));
};

export const handleSubmit = async (
  agencyData: Partial<Agency>,
  setAgencyData: React.Dispatch<React.SetStateAction<Partial<Agency>>>,
  onAgencyAdded: () => void
): Promise<void> => {
  try {
    await AgencyService.post(agencyData as Agency);
    console.log("Agency added successfully!");
    setAgencyData({
      cityId: "",
      name: "",
      address: "",
      website: "",
      email: "",
      phoneNumber: "",
    });
    onAgencyAdded();
  } catch (error) {
    console.error("Error adding agency:", error);
  }
};
