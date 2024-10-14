"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Head from "next/head";
import RouteService from "./services/route.service";
import AgencyService from "./services/agency.service";
import StationService from "./services/station.service";
import { Route, RouteLap, StationTime } from "./models/route.model";
import RouteSearch from "./routes/RouteSearch";
import { Week, Weekdays } from "./models/weekdays.model";
import Station from "./models/station.model";
import RouteSearchResult from "./routes/RouteSearchResult";
import dayjs from "dayjs";
import "dayjs/locale/en";

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
    React.useState<Date>(new Date());
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

  const isToday = (date: Date): boolean => {
    const today = new Date()
    return today.toDateString() === date?.toDateString();
  };

  const [isPastDeparturesExpanded, setIsPastDeparturesExpanded] =
    useState(false);

  const togglePastDepartures = () => {
    setIsPastDeparturesExpanded((prevState) => !prevState);
  };

  const handleDateChange = (date: Date) => {
    setDateOfDeparture(date);

    if (date) {
      const dayIndex = (date.getDay() + 6) % 7;

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
        setStations(fetchedStations);
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

  const handleFilterRoutes = () => {
    const isTodayDeparture = isToday(dateOfDeparture);
    setFixedIsToday(isTodayDeparture);

    setHasSearched(true);
    setShowSearchButton(true);

    setPastDepartures([]);

    if (!tempDepartureDate) {
      setTempDepartureDate(new Date().getDay());
    }

    setError(null);

    const departureDayIndex =
      tempDepartureDate !== null
        ? tempDepartureDate
        : (new Date().getDay() + 6) % 7;
    const departureDay = Week[departureDayIndex];

    const getDepartureTimeForStation = (
      stations: StationTime[],
      stationId: string | null
    ) => {
      const station = stations.find((st) => st.stationId === stationId);
      return station ? station.time : "00:00";
    };

    const filteredRoutes = originalRoutes.flatMap((route) => {
      const departureStationIndex = route.stations.findIndex(
        (station) => station.stationId === tempDepartureStation
      );
      const arrivalStationIndex = route.stations.findIndex(
        (station) => station.stationId === tempArrivalStation
      );

      if (departureStationIndex === -1 || arrivalStationIndex === -1) {
        return [];
      }

      const isReversedOrder = arrivalStationIndex < departureStationIndex;

      const isActiveOnDepartureDay = isReversedOrder
        ? route.returnDays?.[departureDay as keyof Weekdays] ?? false
        : route.activeDays?.[departureDay as keyof Weekdays] ?? false;

      if (!isActiveOnDepartureDay) {
        return [];
      }

      const times = isReversedOrder
        ? route.stations[arrivalStationIndex]?.returnTime || []
        : route.stations[departureStationIndex]?.departureTime || [];

      const validTimes = times.filter((time) => time !== "*");

      if (validTimes.length === 0) {
        return [];
      }

      return validTimes
        .map((time, index) => {
          const departureTime = isReversedOrder
            ? route.stations[arrivalStationIndex]?.returnTime?.[index] || ""
            : route.stations[departureStationIndex]?.departureTime?.[index] ||
            "";
          const arrivalTime = isReversedOrder
            ? route.stations[departureStationIndex]?.returnTime?.[index] || ""
            : route.stations[arrivalStationIndex]?.departureTime?.[index] || "";

          if (departureTime === "*" || arrivalTime === "*") {
            return null;
          }

          const stationsWithTimes: StationTime[] = route.stations.reduce(
            (acc: StationTime[], station, i) => {
              const stationTime: StationTime = {
                stationId: station.stationId,
                time: isReversedOrder
                  ? station.returnTime[index] || ""
                  : station.departureTime[index] || "",
              };

              if (isReversedOrder) {
                acc.unshift(stationTime);
              } else {
                acc.push(stationTime);
              }

              return acc;
            },
            []
          );

          return {
            _id: route._id,
            agencyId: route.agencyId,
            name: route.name,
            type: route.type,
            activeDays: route.activeDays,
            returnDays: route.returnDays,
            stations: stationsWithTimes,
            duration: route.duration,
            departureTime,
          };
        })
        .filter((result) => result !== null) as RouteLap[];
    });

    if (!isTodayDeparture) {
      const sortedRoutes = filteredRoutes.sort((a, b) => {
        const timeA = getDepartureTimeForStation(
          a.stations,
          tempDepartureStation
        )
          .split(":")
          .map(Number);
        const timeB = getDepartureTimeForStation(
          b.stations,
          tempDepartureStation
        )
          .split(":")
          .map(Number);
        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
      });

      setRouteResults(sortedRoutes);
      setSelectedDepartureStation(tempDepartureStation);
      setSelectedArrivalStation(tempArrivalStation);
      return;
    }

    const now = dayjs();
    const nowMinutes = now.hour() * 60 + now.minute();

    const { futureRoutes, pastRoutes } = filteredRoutes.reduce(
      (acc, routeLap) => {
        const departureTimeForSelectedStation = getDepartureTimeForStation(
          routeLap.stations,
          tempDepartureStation
        );

        const [departureHours, departureMinutes] =
          departureTimeForSelectedStation.split(":").map(Number);
        const departureTimeInMinutes = departureHours * 60 + departureMinutes;

        if (departureTimeInMinutes < nowMinutes) {
          acc.pastRoutes.push(routeLap);
        } else {
          acc.futureRoutes.push(routeLap);
        }

        return acc;
      },
      { futureRoutes: [] as RouteLap[], pastRoutes: [] as RouteLap[] }
    );

    const sortedFutureRoutes = futureRoutes.sort((a, b) => {
      const timeA = getDepartureTimeForStation(a.stations, tempDepartureStation)
        .split(":")
        .map(Number);
      const timeB = getDepartureTimeForStation(b.stations, tempDepartureStation)
        .split(":")
        .map(Number);
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });

    const sortedPastRoutes = pastRoutes.sort((a, b) => {
      const timeA = getDepartureTimeForStation(a.stations, tempDepartureStation)
        .split(":")
        .map(Number);
      const timeB = getDepartureTimeForStation(b.stations, tempDepartureStation)
        .split(":")
        .map(Number);
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });

    setPastDepartures(sortedPastRoutes);
    setRouteResults(sortedFutureRoutes);

    setSelectedDepartureStation(tempDepartureStation);
    setSelectedArrivalStation(tempArrivalStation);
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
                <h3 className="text-xl font-semibold mb-2">Uživajte u igri dok čekate!</h3>
                <div
                  className={`relative mx-auto transition-all duration-300 ease-in-out ${isExpanded ? 'w-full h-[80vh]' : 'w-full max-w-[400px] h-[600px]'
                    }`}
                >
                  <iframe
                    src="https://nebez.github.io/floppybird/"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
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
