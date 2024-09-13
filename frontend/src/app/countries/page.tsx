"use client";

import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";
import CountryService from "../services/country.service";
import { Country } from "../models/country.model";
import Head from "next/head";
import { Card } from "@nextui-org/react";
import CountryForm from "./CountryForm";

const CountriesPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fetchedCountries: Country[] = await CountryService.getCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryAdded = (country: Country) => {
    setCountries((prevCountries) => [...prevCountries, country]);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "code", label: "Code" },
    { key: "acronym", label: "Acronym" },
  ];

  return (
    <>
      <Head>
        <title>Countries</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Countries</h1>
        <CountryForm onCountryAdded={handleCountryAdded} />
        <Card shadow="sm" className="p-6">
          <DynamicTable columns={columns} data={countries} />
        </Card>
      </div>
    </>
  );
};

export default CountriesPage;
