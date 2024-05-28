// components/RouteForm.tsx
import React, { useState } from "react";
import { Card, Input, Button, Switch, Textarea } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Station } from "../models/station.model";
import { Agency } from "../models/agency.model";
import { Route, RouteType } from "../models/route.model";
import WeekdaySelector from "../components/WeekdaySelector";
import {
  handleInputChange,
  handleAgencySelect,
  handleRouteTypeSelect,
  handleActiveDaysChange,
  handleReturnDaysChange,
  handleStationSelect,
  handleAddStation,
  handleSubmit,
  handleUseCustomReturnDaysChange,
} from "../handlers/route.form.handler";

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
            onChange={(e) => handleInputChange(e, setRouteData)}
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
            onChange={(selectedOption) =>
              handleAgencySelect(selectedOption, setRouteData)
            }
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
            onChange={(selectedOption) =>
              handleRouteTypeSelect(selectedOption, setRouteData)
            }
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
            onChange={(e) => handleInputChange(e, setRouteData)}
          />
        </div>
        <div className="mx-auto text-center">
          <label>Active Days:</label>
          <WeekdaySelector
            onChange={(selectedDays) =>
              handleActiveDaysChange(
                selectedDays,
                setRouteData,
                useCustomReturnDays
              )
            }
            initialDays={routeData.activeDays}
            disabled={false}
          />
        </div>
        <div className="mx-auto text-center">
          <label>Return Days:</label>
          <WeekdaySelector
            onChange={(selectedDays) =>
              handleReturnDaysChange(selectedDays, setRouteData)
            }
            initialDays={routeData.returnDays}
            disabled={!useCustomReturnDays}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="useCustomReturnDays"
            checked={useCustomReturnDays}
            onChange={() =>
              handleUseCustomReturnDaysChange(
                setUseCustomReturnDays,
                setRouteData,
                routeData.activeDays || {} // Ensure activeDays is always defined
              )
            }
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
            onChange={(selectedOption) =>
              handleStationSelect(selectedOption, setStationSelection)
            }
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
            style={{ overflowY: "auto" }}
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
            style={{ overflowY: "auto" }}
            className="w-25"
          />

          <Button
            onClick={() =>
              handleAddStation(
                stationSelection,
                departureTime,
                returnTime,
                setRouteData,
                setStationSelection,
                setDepartureTime,
                setReturnTime
              )
            }
          >
            Add Station
          </Button>
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
        <Button
          onClick={() => handleSubmit(routeData, setRouteData, onRouteAdded)}
        >
          Add Route
        </Button>
      </div>
    </Card>
  );
};

export default RouteForm;
