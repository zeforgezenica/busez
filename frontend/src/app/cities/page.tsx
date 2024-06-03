"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@nextui-org/react";
import CityService from "../services/city.service";
import CountryService from "../services/country.service";
import { City } from "../models/city.model";
import { Country } from "../models/country.model";
import Head from "next/head";
import DynamicTable from "../components/DynamicTable";
import CityForm from "./CityForm";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../components/map/Map"), { ssr:false });

const CitiesPage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const fetchedCities: City[] = await CityService.getCities();
        setCities(fetchedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const fetchedCountries: Country[] = await CountryService.getCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCities();
    fetchCountries();
  }, []);

  const getCountryName = (countryId: string) => {
    const country = countries.find((country) => country._id === countryId);
    return country ? country.name : "Unknown";
  };

  const citiesWithCountryNames = cities.map((city) => ({
    ...city,
    countryName: getCountryName(city.countryId),
  }));

  const columns = [
    { key: "name", label: "Name" },
    { key: "zipCode", label: "Zip Code" },
    { key: "countryName", label: "Country" },
  ];

  const handleCityAdded = () => {
    const fetchCities = async () => {
      try {
        const fetchedCities: City[] = await CityService.getCities();
        setCities(fetchedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  };

  return (
    <>
      <Head>
        <title>Cities</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Cities</h1>
        <CityForm countries={countries} onCityAdded={handleCityAdded} />
        <Card shadow="sm" className="p-6">
          <MapComponent coordinates={[44.201133, 17.908600]} zoom={6} scrollWheelZoom={true} locations={citiesWithCountryNames} />
          <DynamicTable columns={columns} data={citiesWithCountryNames} />
        </Card>
      </div>
    </>
  );
};

export default CitiesPage;
