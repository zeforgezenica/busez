"use client";

import React, { useEffect, useState } from "react";
import LinearBuffer from "../components/LinearBuffer"; // Adjust the import path as needed
import routeService from "../services/route.service"; // Adjust the import path as needed
import { Route } from "../models/route.model"; // Adjust the import path as needed
import { Input, Button } from "@nextui-org/react";

// Function to convert time string to minutes since midnight
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const BufferPage: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [timeInput, setTimeInput] = useState<string>("");

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeInput(e.target.value);
  };

  const handleSetTime = () => {
    setCurrentTime(timeInput);
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const fetchedRoutes = await routeService.getRoutes();
        setRoutes(fetchedRoutes);
      } catch (error) {
        console.error("Failed to fetch routes", error);
        setRoutes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Buffer Progress</h1>
      <div style={{ marginBottom: "10px" }}>
        <Input
          type="text"
          value={timeInput}
          onChange={handleTimeInputChange}
          placeholder="Enter time (hh:mm:ss)"
          label="Current Time"
        />
        <Button onClick={handleSetTime}>Set Time</Button>
      </div>
      {routes.map((route) => (
        <div key={route._id}>
          <h2>{route.name}</h2>
          <LinearBuffer stations={route.stations} currentTime={currentTime} />
        </div>
      ))}
    </div>
  );
};

export default BufferPage;
