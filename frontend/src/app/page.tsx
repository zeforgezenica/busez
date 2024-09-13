"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import RouteService from "./services/route.service";
import AgencyService from "./services/agency.service";
import StationService from "./services/station.service";
import { Route, RouteLap, StationTime } from "./models/route.model";
import RouteSearch from "./routes/RouteSearch";
import { Week, Weekdays } from "./models/weekdays.model";
import Agency from "./models/agency.model";
import Station from "./models/station.model";
import RouteSearchResult from "./routes/RouteSearchResult";
import dayjs from "dayjs";
import "dayjs/locale/en";

const HomePage: React.FC = () => {
  const [routeResults, setRouteResults] = useState<RouteLap[]>([]);
  const [originalRoutes, setOriginalRoutes] = useState<Route[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
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

  const isToday = (date: dayjs.Dayjs | null): boolean => {
    return true;
    return date ? date.isSame(dayjs(), "day") : false;
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

    setPastDepartures([]);

    if (!tempDepartureDate) {
      setTempDepartureDate(new Date().getDay());
    }

    if (!tempDepartureStation || !tempArrivalStation) {
      setError("Please select both departure and arrival stations.");
      return;
    }

    if (tempDepartureStation === tempArrivalStation) {
      setError("Please select different departure and arrival stations.");
      return;
    }

    setError(null);

    const departureDayIndex =
      tempDepartureDate !== null
        ? tempDepartureDate
        : (new Date().getDay() + 6) % 7;
    const departureDay = Week[departureDayIndex];

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
        .filter((result) => result !== null);
    });

    if (!isTodayDeparture) {
      setRouteResults(filteredRoutes);
      setSelectedDepartureStation(tempDepartureStation);
      setSelectedArrivalStation(tempArrivalStation);
      return;
    }

    const now = dayjs();
    const nowMinutes = now.hour() * 60 + now.minute();

    const getDepartureTimeForStation = (
      stations: StationTime[],
      stationId: string
    ) => {
      const station = stations.find((st) => st.stationId === stationId);
      return station ? station.time : "00:00";
    };

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

    setPastDepartures(pastRoutes);
    setRouteResults(sortedFutureRoutes);

    setSelectedDepartureStation(tempDepartureStation);
    setSelectedArrivalStation(tempArrivalStation);
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
        <title>Busez</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Busez</h1>
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
          <div className="text-xl font-semibold mb-4">Upcoming Departures</div>
        )}

        {hasSearched &&
          (routeResults.length > 0 ? (
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
            <div className="no-results">No routes found.</div>
          ))}
        {hasSearched && fixedIsToday && pastDepartures.length > 0 && (
          <>
            <div className="text-xl font-semibold mb-4">Past Departures</div>
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
            })}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
