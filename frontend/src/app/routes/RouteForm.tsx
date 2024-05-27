import React, { useState } from "react";
import { Card, Input, Button, Switch, Textarea } from "@nextui-org/react"; // Import Textarea
import dynamic from "next/dynamic";
import { Station } from "../models/station.model";
import { Agency } from "../models/agency.model";
import { Route, RouteType, StationTimes } from "../models/route.model";
import { Weekdays } from "../models/weekdays.model";
import RouteService from "../services/route.service";
import WeekdaySelector from "../components/WeekdaySelector";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface RouteFormProps {
  stations: Station[];
  agencies: Agency[];
  onRouteAdded: () => void;
}

const RouteForm: React.FC<RouteFormProps> = ({
  stations,
  agencies,
  onRouteAdded,
}) => {
  const [routeData, setRouteData] = useState<Partial<Route>>({
    name: "",
    agencyId: "",
    duration: "",
    stations: [],
    activeDays: {},
    returnDays: {},
    type: undefined,
  });

  const [stationSelection, setStationSelection] = useState<any>(null);
  const [departureTime, setDepartureTime] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");
  const [useCustomReturnDays, setUseCustomReturnDays] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setRouteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAgencySelect = (selectedOption: any): void => {
    setRouteData((prevData) => ({
      ...prevData,
      agencyId: selectedOption.value,
    }));
  };

  const handleRouteTypeSelect = (selectedOption: any): void => {
    setRouteData((prevData) => ({
      ...prevData,
      type: selectedOption.value,
    }));
  };

  const handleActiveDaysChange = (selectedDays: Weekdays): void => {
    setRouteData((prevData) => ({
      ...prevData,
      activeDays: selectedDays,
    }));
  };

  const handleReturnDaysChange = (selectedDays: Weekdays): void => {
    setRouteData((prevData) => ({
      ...prevData,
      returnDays: selectedDays,
    }));
  };

  const handleStationSelect = (selectedOption: any): void => {
    setStationSelection(selectedOption);
  };

  const handleAddStation = (): void => {
    if (stationSelection && departureTime && returnTime) {
      const newStationTimes: StationTimes = {
        stationId: stationSelection.value,
        departureTime: departureTime.split(/\n/).map((time) => time.trim()),
        returnTime: returnTime.split(/\n/).map((time) => time.trim()),
      };
      setRouteData((prevData: Partial<Route>) => ({
        ...prevData,
        stations: [...(prevData.stations || []), newStationTimes],
      }));
      setStationSelection(null);
      setDepartureTime("");
      setReturnTime("");
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      console.log("Submitted Route Data:", routeData);

      // Re-enable the POST request
      const newRoute = await RouteService.post(routeData as Route);
      console.log("Route added successfully!", newRoute);

      // Reset state after logging the route data
      setRouteData({
        name: "",
        agencyId: "",
        duration: "",
        stations: [],
        activeDays: {},
        returnDays: {},
        type: undefined,
      });

      // Call onRouteAdded without arguments
      onRouteAdded();
    } catch (error) {
      console.error("Error adding route:", error);
    }
  };

  const handleUseCustomReturnDaysChange = (): void => {
    setUseCustomReturnDays((prevValue) => !prevValue);
    if (!useCustomReturnDays) {
      setRouteData((prevData) => ({
        ...prevData,
        returnDays: {},
      }));
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

  const routeTypeOptions = [
    { value: RouteType.Intercity, label: "Intercity" },
    { value: RouteType.International, label: "International" },
    { value: RouteType.Local, label: "Local" },
  ];

  return (
    <Card shadow="sm" className="p-6 mb-4">
      <h2 className="text-xl mb-2">Add New Route</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="routeName">Name:</label>
          <Input
            id="routeName"
            name="name"
            value={routeData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="routeAgency">Agency:</label>
          <Select
            id="routeAgency"
            name="agencyId"
            options={agencies.map((agency) => ({
              value: agency._id,
              label: agency.name,
            }))}
            onChange={handleAgencySelect}
            placeholder="Select Agency"
            styles={customSelectStyles}
          />
        </div>
        <div>
          <label htmlFor="routeType">Route Type:</label>
          <Select
            id="routeType"
            name="type"
            options={routeTypeOptions}
            onChange={handleRouteTypeSelect}
            placeholder="Select Route Type"
            styles={customSelectStyles}
          />
        </div>
        <div>
          <label htmlFor="routeDuration">Duration:</label>
          <Input
            id="routeDuration"
            name="duration"
            value={routeData.duration}
            onChange={handleInputChange}
          />
        </div>
        <div className="mx-auto text-center">
          <label>Active Days:</label>
          <WeekdaySelector
            onChange={handleActiveDaysChange}
            initialDays={routeData.activeDays}
            disabled={false}
          />
        </div>
        <div className="mx-auto text-center">
          <label>Return Days:</label>
          <WeekdaySelector
            onChange={handleReturnDaysChange}
            initialDays={routeData.returnDays}
            disabled={!useCustomReturnDays}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="useCustomReturnDays"
            checked={useCustomReturnDays}
            onChange={handleUseCustomReturnDaysChange}
          />
          <label htmlFor="useCustomReturnDays" className="text-sm">
            Use Custom Return Days
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            id="routeStations"
            name="stations"
            options={stations.map((station) => ({
              value: station._id,
              label: station.name,
            }))}
            onChange={handleStationSelect}
            value={stationSelection}
            placeholder="Select Station"
            styles={customSelectStyles}
            className="flex-grow"
          />
          <Textarea
            id="departureTime"
            name="departureTime"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            placeholder="Departure Time"
            minRows={1}
            maxRows={6}
            style={{ overflowY: "auto" }} // Show scrollbar if content exceeds maxRows
            className="w-25"
          />
          <Textarea
            id="returnTime"
            name="returnTime"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            placeholder="Return Time"
            minRows={1}
            maxRows={6}
            style={{ overflowY: "auto" }} // Show scrollbar if content exceeds maxRows
            className="w-25"
          />

          <Button onClick={handleAddStation}>Add Station</Button>
        </div>

        <div>
          {routeData.stations?.map((station, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span>
                {stations.find((s) => s._id === station.stationId)?.name}
              </span>
              <span>{station.departureTime.join(", ")}</span>
              <span>{station.returnTime.join(", ")}</span>
            </div>
          ))}
        </div>
        <Button onClick={handleSubmit}>Add Route</Button>
      </div>
    </Card>
  );
};

export default RouteForm;
