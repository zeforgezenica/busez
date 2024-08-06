"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@nextui-org/react";
import Head from "next/head";
import RouteService from "../services/route.service";
import AgencyService from "../services/agency.service";
import StationService from "../services/station.service";
import { Route, RouteType } from "../models/route.model";
import RoutesTable from "./RoutesTable";
import RouteForm from "./RouteForm";
import RouteSearch from "./RouteSearch";
import { Week, Weekdays } from "../models/weekdays.model";
import Agency from "../models/agency.model";
import Station from "../models/station.model";

const RoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [originalRoutes, setOriginalRoutes] = useState<Route[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);

  const [selectedDepartureStation, setSelectedDepartureStation] = useState<
    string | null
  >(null);
  const [selectedArrivalStation, setSelectedArrivalStation] = useState<
    string | null
  >(null);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState<
    number | null
  >(null);
  const [selectedReturnDate, setSelectedReturnDate] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const fetchedRoutes = await RouteService.getRoutes();
        setRoutes(fetchedRoutes);
        setOriginalRoutes(fetchedRoutes);
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
      setOriginalRoutes(fetchedRoutes);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const handleFilterRoutes = () => {
    const departureStationName = selectedDepartureStation
      ? stations.find((station) => station._id === selectedDepartureStation)
          ?.name
      : "None";
    const arrivalStationName = selectedArrivalStation
      ? stations.find((station) => station._id === selectedArrivalStation)?.name
      : "None";

    const departureDay =
      selectedDepartureDate !== null ? Week[selectedDepartureDate] : "None";
    const returnDay =
      selectedReturnDate !== null ? Week[selectedReturnDate] : "None";

    const filteredRoutes = originalRoutes.filter((route) => {
      const departureStationIndex = route.stations.findIndex(
        (station) => station.stationId === selectedDepartureStation
      );
      const arrivalStationIndex = route.stations.findIndex(
        (station) => station.stationId === selectedArrivalStation
      );

      const isReversedOrder = arrivalStationIndex < departureStationIndex;

      const isActiveOnDepartureDay = isReversedOrder
        ? returnDay !== "None"
          ? route.activeDays[returnDay as keyof Weekdays] ?? false
          : true
        : departureDay !== "None"
        ? route.activeDays[departureDay as keyof Weekdays] ?? false
        : true;

      const isActiveOnReturnDay = isReversedOrder
        ? departureDay !== "None"
          ? route.returnDays?.[departureDay as keyof Weekdays] ?? false
          : true
        : returnDay !== "None"
        ? route.returnDays?.[returnDay as keyof Weekdays] ?? false
        : true;

      if (
        selectedDepartureStation &&
        !route.stations.some(
          (station) => station.stationId === selectedDepartureStation
        )
      ) {
        return false;
      }
      if (
        selectedArrivalStation &&
        !route.stations.some(
          (station) => station.stationId === selectedArrivalStation
        )
      ) {
        return false;
      }
      return isActiveOnDepartureDay && isActiveOnReturnDay;
    });

    setRoutes(filteredRoutes);
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

        <RouteSearch
          stations={stations}
          selectedDepartureStation={selectedDepartureStation}
          selectedArrivalStation={selectedArrivalStation}
          selectedDepartureDate={selectedDepartureDate}
          selectedReturnDate={selectedReturnDate}
          setSelectedDepartureDate={setSelectedDepartureDate}
          setSelectedReturnDate={setSelectedReturnDate}
          setSelectedDepartureStation={setSelectedDepartureStation}
          setSelectedArrivalStation={setSelectedArrivalStation}
          onFilter={handleFilterRoutes}
        />

        {routes.map((route) => (
          <Card key={route._id} shadow="sm" className="p-6 mb-4">
            <h2 className="text-xl mb-2">{route.name}</h2>
            <p>Agency: {agencyNames[route.agencyId]}</p>
            <p>Active Days: {renderWeekdays(route.activeDays)}</p>
            {route.returnDays &&
              areDaysDifferent(route.activeDays, route.returnDays) && (
                <p>Return Days: {renderWeekdays(route.returnDays)}</p>
              )}
            <p>Duration: {route.duration}</p>
            <p>Type: {getRouteType(route.type)}</p>
            <br />
            <RoutesTable route={route} stations={stations} />
          </Card>
        ))}
      </div>
    </>
  );
};

const renderWeekdays = (weekdays: Weekdays): string => {
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

const areDaysDifferent = (
  activeDays: Weekdays,
  returnDays: Weekdays
): boolean => {
  const activeDayKeys = Object.keys(activeDays) as (keyof Weekdays)[];
  const returnDayKeys = Object.keys(returnDays) as (keyof Weekdays)[];
  if (activeDayKeys.length !== returnDayKeys.length) {
    return true;
  }
  for (const key of activeDayKeys) {
    if (activeDays[key] !== returnDays[key]) {
      return true;
    }
  }
  return false;
};

export default RoutesPage;
