"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@nextui-org/react";
import DynamicTable from "../components/DynamicTable";
import StationService from "../services/station.service";
import CityService from "../services/city.service";
import { Station } from "../models/station.model";
import { City } from "../models/city.model";
import Head from "next/head";
import StationForm from "./StationForm";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../components/map/Map"), { ssr:false });

const StationsPage: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const fetchedStations: Station[] = await StationService.getStations();
        setStations(fetchedStations);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    const fetchCities = async () => {
      try {
        const fetchedCities: City[] = await CityService.getCities();
        setCities(fetchedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchStations();
    fetchCities();
  }, []);

  const handleStationAdded = (station: Station) => {
    setStations((prevStations) => [...prevStations, station]);
  };

  const getCityName = (cityId: string) => {
    const city = cities.find((city) => city._id === cityId);
    return city ? city.name : "Unknown";
  };

  const stationsWithCityNames = stations.map((station) => ({
    ...station,
    cityName: getCityName(station.cityId),
  }));

  const columns = [
    { key: "cityName", label: "City Name" },
    { key: "name", label: "Name" },
    { key: "coordinates", label: "Coordinates" },
  ];

  return (
    <>
      <Head>
        <title>Stations</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Stations</h1>
        <StationForm cities={cities} onStationAdded={handleStationAdded} />
        <Card shadow="sm" className="p-6">
          <MapComponent coordinates={[44.201133, 17.908600]} zoom={13} scrollWheelZoom={true} locations={stationsWithCityNames} />
          <DynamicTable columns={columns} data={stationsWithCityNames} />
        </Card>
      </div>
    </>
  );
};

export default StationsPage;
