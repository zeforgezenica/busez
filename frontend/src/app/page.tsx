"use client";

import { GeolocationDisplay } from "@/components/GeolocationDisplay";
import { Button } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Route, RouteLap } from "./models/route.model";
import Station from "./models/station.model";
import RouteSearch from "./routes/RouteSearch";
import RouteSearchResult from "./routes/RouteSearchResult";
import AgencyService from "./services/agency.service";
import RouteService from "./services/route.service";
import StationService from "./services/station.service";
import FilterService from "./handlers/route.filter.handler";
import { toSortedStationsAlphabetically } from "@/lib/utils";


const HomePage: React.FC = () => {
  const [routeResults, setRouteResults] = useState<RouteLap[]>([]);
  const [originalRoutes, setOriginalRoutes] = useState<Route[]>([]);

  const [showSearchButton, setShowSearchButton] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [stations, setStations] = useState<Station[]>([]);
  const [selectedDepartureStation, setSelectedDepartureStation] = useState<
    string | null
  >(null);
  const [selectedArrivalStation, setSelectedArrivalStation] = useState<
    string | null
  >(null);
  const [dateOfDeparture, setDateOfDeparture] =
    React.useState<dayjs.Dayjs | null>(dayjs());
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [tempDepartureStation, setTempDepartureStation] = useState<
    string | null
  >(null);
  const [tempArrivalStation, setTempArrivalStation] = useState<string | null>(
    null
  );
  const [tempDepartureDate, setTempDepartureDate] = useState<number | null>(
    null
  );
  const [fixedIsToday, setFixedIsToday] = useState<boolean>(false);
  const [pastDepartures, setPastDepartures] = useState<RouteLap[]>([]);

  const [isPastDeparturesExpanded, setIsPastDeparturesExpanded] =
    useState(false);

  const togglePastDepartures = () => {
    setIsPastDeparturesExpanded((prevState) => !prevState);
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setDateOfDeparture(date);

    if (date) {
      const dayIndex = (date.day() + 6) % 7;

      setTempDepartureDate(dayIndex);
    }
  };

  useEffect(() => {
    const today = (new Date().getDay() + 6) % 7;
    setTempDepartureDate(today);

    const fetchRoutes = async () => {
      try {
        const fetchedRoutes = await RouteService.getRoutes();
        setOriginalRoutes(fetchedRoutes);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    const fetchStations = async () => {
      try {
        const fetchedStations = await StationService.getStations();
        setStations(toSortedStationsAlphabetically(fetchedStations));
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchRoutes();
    fetchStations();
  }, []);

  const [agencyNames, setAgencyNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchAgencyNames = async () => {
      const agencyIds = originalRoutes.map((route) => route.agencyId);
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

    if (originalRoutes.length > 0) {
      fetchAgencyNames();
    }
  }, [originalRoutes]);

  const isToday = (date: dayjs.Dayjs | null): boolean => {
    return date ? date.isSame(dayjs(), "day") : false;
  };

  const handleFilterRoutes = () => {
    const isTodayDeparture = isToday(dateOfDeparture);
    setFixedIsToday(isTodayDeparture);

    setHasSearched(true);
    setShowSearchButton(true);

    if (!tempDepartureDate) {
      setTempDepartureDate(new Date().getDay());
    }

    setError(null);

    const [srcStation, destStation, departDate] = [tempDepartureStation, tempArrivalStation, tempDepartureDate];
    const validationPass = srcStation !== null && destStation !== null && departDate !== null;
    if(!validationPass) {
      setSelectedDepartureStation(null);
      setSelectedArrivalStation(null);
      setRouteResults([]);
      setPastDepartures([]);
      // setError(null); consider giving error message if validation fails?
      setHasSearched(false);
      return;
    }
    const {sortedResults, sortedPastDepartures} = FilterService.getFilterResults(originalRoutes, srcStation, destStation, departDate, isTodayDeparture);

    setSelectedDepartureStation(tempDepartureStation);
    setSelectedArrivalStation(tempArrivalStation);
    setRouteResults(sortedResults);
    setPastDepartures(sortedPastDepartures);
  };

  const handleSearchButtonClick = () => {
    setShowGame(!showGame);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const calculateDuration = (startTime: string, endTime: string): number => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    return endTotalMinutes >= startTotalMinutes
      ? endTotalMinutes - startTotalMinutes
      : 24 * 60 - startTotalMinutes + endTotalMinutes;
  };

  return (
    <>
      <Head>
        <title>kadJeBus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-center mb-4">kadJeBus</h1>
        <h2 className="text-xl text-center mb-2">
          Aplikacija za prikaz informacija o redu vožnje javnog prevoza u
          Zenici.
        </h2>
        <GeolocationDisplay />
        <RouteSearch
          stations={stations}
          selectedDepartureStation={tempDepartureStation}
          selectedArrivalStation={tempArrivalStation}
          setSelectedDepartureStation={setTempDepartureStation}
          setSelectedArrivalStation={setTempArrivalStation}
          dateOfDeparture={dateOfDeparture}
          onDateChange={handleDateChange}
          onFilter={handleFilterRoutes}
        />

        {error && <div className="error">{error}</div>}

        {hasSearched && fixedIsToday && (
          <div className="text-xl font-semibold mb-4">Nadolazeći Polasci</div>
        )}

        {hasSearched && (
          <>
            {routeResults.length > 0 ? (
              routeResults.map((routeLap) => {
                const departureStationIndex = routeLap.stations.findIndex(
                  (station) => station.stationId === selectedDepartureStation
                );
                const arrivalStationIndex = routeLap.stations.findIndex(
                  (station) => station.stationId === selectedArrivalStation
                );

                const departureTime =
                  routeLap.stations[departureStationIndex]?.time || "";
                const arrivalTime =
                  routeLap.stations[arrivalStationIndex]?.time || "";
                const deltatime = calculateDuration(departureTime, arrivalTime);

                return (
                  <RouteSearchResult
                    key={`${routeLap._id}-${departureTime}-${arrivalTime}`}
                    route={routeLap}
                    agencyName={agencyNames[routeLap.agencyId]}
                    stations={stations}
                    departureStationId={selectedDepartureStation}
                    arrivalStationId={selectedArrivalStation}
                    departureTime={departureTime}
                    arrivalTime={arrivalTime}
                    deltaTime={deltatime}
                    isToday={fixedIsToday}
                  />
                );
              })
            ) : (
              <div className="no-results">Nema pronađenih linija.</div>
            )}

            {showSearchButton && (
              <Button
                color="primary"
                onClick={handleSearchButtonClick}
                className="mt-4 mb-4"
              >
                {showGame ? "Sakrij igru" : "Igraj Flappy Bird"}
              </Button>
            )}

            {showGame && (
              <div className="mt-4 mb-4">
                <h3 className="text-xl font-semibold mb-2">
                  Uživajte u igri dok čekate!
                </h3>
                <div
                  className={`relative mx-auto transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "w-full h-[80vh]"
                      : "w-full max-w-[400px] h-[600px]"
                  }`}
                >
                  <iframe
                    src="https://nebez.github.io/floppybird/"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                    title="Flappy Bird Game"
                  ></iframe>
                </div>
                <Button
                  color="secondary"
                  onClick={toggleExpand}
                  className="mt-4"
                >
                  {isExpanded ? "Smanji igru" : "Proširi igru"}
                </Button>
              </div>
            )}
          </>
        )}

        {hasSearched && fixedIsToday && pastDepartures.length > 0 && (
          <>
            <div
              className="p-6 mb-4 w-full md:w-2/3 lg:w-1/2 mx-auto text-xl font-semibold flex justify-between items-center cursor-pointer"
              onClick={togglePastDepartures}
            >
              <span>Prošli Polasci</span>
              <div className="flex justify-between items-center cursor-pointer">
                <span className="text-sm underline">
                  {isPastDeparturesExpanded ? "Sakrij" : "Prikaži"}
                </span>
                <span className="ml-1">
                  {isPastDeparturesExpanded ? "▲" : "▼"}
                </span>
              </div>
            </div>

            <hr className="border-t border-gray-300 mb-4 w-full md:w-2/3 lg:w-1/2 mx-auto" />

            {isPastDeparturesExpanded && (
              <>
                {pastDepartures.map((routeLap) => {
                  const departureStationIndex = routeLap.stations.findIndex(
                    (station) => station.stationId === selectedDepartureStation
                  );
                  const arrivalStationIndex = routeLap.stations.findIndex(
                    (station) => station.stationId === selectedArrivalStation
                  );

                  const departureTime =
                    routeLap.stations[departureStationIndex]?.time || "";
                  const arrivalTime =
                    routeLap.stations[arrivalStationIndex]?.time || "";
                  const deltatime = calculateDuration(
                    departureTime,
                    arrivalTime
                  );

                  return (
                    <RouteSearchResult
                      key={`${routeLap._id}-${departureTime}-${arrivalTime}`}
                      route={routeLap}
                      agencyName={agencyNames[routeLap.agencyId]}
                      stations={stations}
                      departureStationId={selectedDepartureStation}
                      arrivalStationId={selectedArrivalStation}
                      departureTime={departureTime}
                      arrivalTime={arrivalTime}
                      deltaTime={deltatime}
                      isToday={fixedIsToday}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
