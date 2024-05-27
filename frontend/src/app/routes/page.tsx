"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@nextui-org/react";
import RouteService from "../services/route.service";
import AgencyService from "../services/agency.service";
import StationService from "../services/station.service";
import { Route, RouteType } from "../models/route.model";
import { Agency } from "../models/agency.model";
import { Station } from "../models/station.model";
import Head from "next/head";
import RoutesTable from "./RoutesTable";
import RouteForm from "./RouteForm";

const RoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const fetchedRoutes = await RouteService.getRoutes();
        setRoutes(fetchedRoutes);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    const fetchStations = async () => {
      try {
        const fetchedStations = await StationService.getStations();
        setStations(fetchedStations);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    const fetchAgencies = async () => {
      try {
        const fetchedAgencies = await AgencyService.getAgencies();
        setAgencies(fetchedAgencies);
      } catch (error) {
        console.error("Error fetching agencies:", error);
      }
    };

    fetchRoutes();
    fetchStations();
    fetchAgencies();
  }, []);

  const [agencyNames, setAgencyNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchAgencyNames = async () => {
      const agencyIds = routes.map((route) => route.agencyId);
      const uniqueAgencyIds = Array.from(new Set(agencyIds));

      const agencyNamePromises = uniqueAgencyIds.map(async (agencyId) => {
        try {
          const agency = await AgencyService.getAgency(agencyId);
          return { [agencyId]: agency.name };
        } catch (error) {
          console.error("Error fetching agency:", error);
          return { [agencyId]: "Unknown Agency" };
        }
      });

      Promise.all(agencyNamePromises)
        .then((agencyNameObjects) => {
          const mergedAgencyNames = Object.assign({}, ...agencyNameObjects);
          setAgencyNames(mergedAgencyNames);
        })
        .catch((error) => console.error("Error fetching agency names:", error));
    };

    if (routes.length > 0) {
      fetchAgencyNames();
    }
  }, [routes]);

  const handleRouteAdded = async () => {
    try {
      const fetchedRoutes = await RouteService.getRoutes();
      setRoutes(fetchedRoutes);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Routes</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Routes</h1>
        <RouteForm
          stations={stations}
          agencies={agencies}
          onRouteAdded={handleRouteAdded}
        />

        {routes.map((route) => (
          <Card key={route._id} shadow="sm" className="p-6 mb-4">
            <h2 className="text-xl mb-2">{route.name}</h2>
            <p>Agency: {agencyNames[route.agencyId]}</p>
            <p>Active Days: {renderWeekdays(route.activeDays)}</p>
            {route.returnDays &&
              Object.values(route.returnDays).some(Boolean) && (
                <p>Return Days: {renderWeekdays(route.returnDays)}</p>
              )}
            <p>Duration: {route.duration}</p>
            <p>Type: {getRouteType(route.type)}</p>
            <br />
            <RoutesTable routes={routes} stations={stations} />
          </Card>
        ))}
      </div>
    </>
  );
};

const renderWeekdays = (weekdays: any): string => {
  const days = Object.keys(weekdays).filter(
    (day) => weekdays[day as keyof typeof weekdays]
  );
  return days.join(", ");
};

const getRouteType = (type: RouteType): string => {
  switch (type) {
    case RouteType.Intercity:
      return "Intercity";
    case RouteType.International:
      return "International";
    case RouteType.Local:
      return "Local";
    default:
      return "Unknown";
  }
};

export default RoutesPage;
