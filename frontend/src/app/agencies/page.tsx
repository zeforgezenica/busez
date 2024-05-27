"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@nextui-org/react";
import DynamicTable from "../components/DynamicTable";
import AgencyService from "../services/agency.service";
import CityService from "../services/city.service";
import { Agency } from "../models/agency.model";
import { City } from "../models/city.model";
import Head from "next/head";
import AgencyForm from "./AgencyForm";

const AgenciesPage: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const fetchedAgencies: Agency[] = await AgencyService.getAgencies();
        setAgencies(fetchedAgencies);
      } catch (error) {
        console.error("Error fetching agencies:", error);
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

    fetchAgencies();
    fetchCities();
  }, []);

  const getCityName = (cityId: string) => {
    const city = cities.find((city) => city._id === cityId);
    return city ? city.name : "Unknown";
  };

  const agenciesWithCityNames = agencies.map((agency) => ({
    ...agency,
    cityName: getCityName(agency.cityId),
  }));

  const columns = [
    { key: "name", label: "Name" },
    { key: "address", label: "Address" },
    { key: "website", label: "Website" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "cityName", label: "City" },
  ];

  const handleAgencyAdded = () => {
    const fetchAgencies = async () => {
      try {
        const fetchedAgencies: Agency[] = await AgencyService.getAgencies();
        setAgencies(fetchedAgencies);
      } catch (error) {
        console.error("Error fetching agencies:", error);
      }
    };

    fetchAgencies();
  };

  return (
    <>
      <Head>
        <title>Agencies</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Agencies</h1>
        <AgencyForm cities={cities} onAgencyAdded={handleAgencyAdded} />
        <Card shadow="sm" className="p-6">
          <DynamicTable columns={columns} data={agenciesWithCityNames} />
        </Card>
      </div>
    </>
  );
};

export default AgenciesPage;
