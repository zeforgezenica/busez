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
import { Calendar } from "@/components/ui/calendar"
import StationSelect from "@/components/StationSelect";
import Modal from "@/components/ui/modal";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
  const [isModalOpen, setModalOpen] = useState(false);

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
      <div className="container mx-auto p-4">
        <div className="flex flex-row justify-between items-center align-middle">
          <h1 className="text-4xl font-bold text-left text-gray-400 mb-4">KADjeBUS</h1>
          <Button className="text-indigo-400" onClick={() => setModalOpen(true)}>
            <div className={"flex flex-col justify-center items-center align-middle"}>
              <SportsEsportsIcon className={"text-2xl"}/>
              <span className={"font-medium"}>Zabavi se</span>
            </div>
          </Button>
        </div>
        {/*<GeolocationDisplay />*/}
        <div className="flex flex-col md:flex-row">
          <div>
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
          </div>
          <div className={"w-full sm:p-4"}>
            {/*{hasSearched && fixedIsToday && (*/}
            {/*    <div className="text-3xl text-gray-600 font-semibold mb-10">Nadolazeći Polasci</div>*/}
            {/*)}*/}
            <div>
              <Modal
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Uživajte u igri dok čekate"
              >
                <div className="mt-4 mb-4">
                  <div
                      className={`relative mx-auto transition-all duration-300 ease-in-out w-full h-[65vh]`}
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
                </div>
              </Modal>
            </div>
            {hasSearched && (
                <div>
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
                      <div className="no-results text-center mb-5 font-medium">Nema pronađenih linija.</div>
                  )}
                </div>
            )}

            {hasSearched && fixedIsToday && pastDepartures.length > 0 && (
                <>
                  <div
                      className="bg-indigo-400 text-white rounded py-3 px-6 mb-4 w-full mx-auto text-xl font-semibold flex justify-between items-center cursor-pointer"
                      onClick={togglePastDepartures}
                  >
                    <span>Prošli Polasci</span>
                    <div className="flex justify-between items-center cursor-pointer">
                      <span className="ml-1">
                      {isPastDeparturesExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </span>
                    </div>
                  </div>

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
        </div>
      </div>
    </>
  );
};

export default HomePage;
