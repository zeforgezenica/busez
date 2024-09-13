import { ChangeEvent, Dispatch, SetStateAction } from "react";
import RouteService from "../services/route.service";
import { Route, StationTimes } from "../models/route.model";
import { Weekdays } from "../models/weekdays.model";

export const handleInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  setRouteData: Dispatch<SetStateAction<Partial<Route>>>
): void => {
  const { name, value } = event.target;
  setRouteData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleAgencySelect = (
  selectedOption: any,
  setRouteData: Dispatch<SetStateAction<Partial<Route>>>
): void => {
  setRouteData((prevData) => ({
    ...prevData,
    agencyId: selectedOption.value,
  }));
};

export const handleRouteTypeSelect = (
  selectedOption: any,
  setRouteData: Dispatch<SetStateAction<Partial<Route>>>
): void => {
  setRouteData((prevData) => ({
    ...prevData,
    type: selectedOption.value,
  }));
};

export const handleActiveDaysChange = (
  selectedDays: Weekdays,
  setRouteData: Dispatch<SetStateAction<Partial<Route>>>,
  useCustomReturnDays: boolean
): void => {
  setRouteData((prevData) => ({
    ...prevData,
    activeDays: selectedDays,
  }));
  if (!useCustomReturnDays) {
    setRouteData((prevData) => ({
      ...prevData,
      returnDays: { ...selectedDays },
    }));
  }
};

export const handleReturnDaysChange = (
  selectedDays: Weekdays,
  setRouteData: Dispatch<SetStateAction<Partial<Route>>>
): void => {
  setRouteData((prevData) => ({
    ...prevData,
    returnDays: selectedDays,
  }));
};

export const handleStationSelect = (
  selectedOption: any,
  setStationSelection: Dispatch<SetStateAction<any>>
): void => {
  setStationSelection(selectedOption);
};

export const handleAddStation = (
  stationSelection: any,
  departureTime: string,
  returnTime: string,
  setRouteData: Dispatch<SetStateAction<Partial<Route>>>,
  setStationSelection: Dispatch<SetStateAction<any>>,
  setDepartureTime: Dispatch<SetStateAction<string>>,
  setReturnTime: Dispatch<SetStateAction<string>>
): void => {
  if (stationSelection && departureTime && returnTime) {
    const newStationTimes: StationTimes = {
      stationId: stationSelection.value,
      departureTime: departureTime.split(/\n/).map((time) => time.trim()),
      returnTime: returnTime.split(/\n/).map((time) => time.trim()),
    };
    setRouteData((prevData) => ({
      ...prevData,
      stations: [...(prevData.stations || []), newStationTimes],
    }));
    setStationSelection(null);
    setDepartureTime("");
    setReturnTime("");
  }
};

export const handleSubmit = async (
  routeData: Partial<Route>,
  setRouteData: Dispatch<SetStateAction<Partial<Route>>>,
  onRouteAdded: () => void
): Promise<void> => {
  try {
    const newRoute = await RouteService.post(routeData as Route);
    console.log("Route added successfully!", newRoute);

    setRouteData({
      name: "",
      agencyId: "",
      duration: "",
      stations: [],
      activeDays: {},
      returnDays: {},
      type: undefined,
    });

    onRouteAdded();
  } catch (error) {
    console.error("Error adding route:", error);
  }
};

export const handleUseCustomReturnDaysChange = (
  setUseCustomReturnDays: Dispatch<SetStateAction<boolean>>,
  setRouteData: Dispatch<SetStateAction<Partial<Route>>>,
  activeDays: Weekdays
): void => {
  setUseCustomReturnDays((prevValue) => {
    const newValue = !prevValue;
    if (!newValue) {
      setRouteData((prevData) => ({
        ...prevData,
        returnDays: { ...activeDays },
      }));
    } else {
      setRouteData((prevData) => ({
        ...prevData,
        returnDays: {},
      }));
    }
    return newValue;
  });
};
