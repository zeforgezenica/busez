import { Station } from "../models/station.model";
import StationService from "../services/station.service";

export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setStationData: React.Dispatch<React.SetStateAction<Partial<Station>>>
): void => {
  const { name, value } = event.target;
  setStationData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleCitySelect = (
  selectedOption: any,
  setStationData: React.Dispatch<React.SetStateAction<Partial<Station>>>
): void => {
  setStationData((prevData) => ({
    ...prevData,
    cityId: selectedOption.value,
  }));
};

export const handleSubmit = async (
  stationData: Partial<Station>,
  setStationData: React.Dispatch<React.SetStateAction<Partial<Station>>>,
  onStationAdded: (station: Station) => void
): Promise<void> => {
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
