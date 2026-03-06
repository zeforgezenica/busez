"use client";

import { GeolocationDisplay } from "@/components/GeolocationDisplay";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Route, RouteLap } from "../models/route.model";
import Station from "../models/station.model";
import RouteSearch from "../routes/RouteSearch";
import RouteGridView from "./RouteGridView";
import RouteTableView from "./RouteTableView";
import RouteTableView from './RouteTableView';
import FavoriteButton from "./FavoriteButton";
import FavoritesList from "./FavoritesList";
import AgencyService from "../services/agency.service";
import RouteService from "../services/route.service";
import StationService from "../services/station.service";
import FilterService from "../handlers/route.filter.handler";
import { toSortedStationsAlphabetically } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";

const HomePage: React.FC = () => {
  const [routeResults, setRouteResults] = useState<RouteLap[]>([]);
  const [originalRoutes, setOriginalRoutes] = useState<Route[]>([]);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
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

  const {
    historyDepartureStationIds,
    historyArrivalStationIds,
    addStationsToHistory,
  } = useSearchHistory();

  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
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
  const [fixedIsToday, setFixedIsToday] = useState<boolean>(false);
  const [pastDepartures, setPastDepartures] = useState<RouteLap[]>([]);
  const [isPastDeparturesExpanded, setIsPastDeparturesExpanded] =
    useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const togglePastDepartures = () => {
    setIsPastDeparturesExpanded((prevState) => !prevState);
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setDateOfDeparture(date);
  };

  useEffect(() => {
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

  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    if (from && to && date && stations.length > 0 && originalRoutes.length > 0) {
      const departureDate = dayjs(date);

      setTempDepartureStation(from);
      setTempArrivalStation(to);
      setDateOfDeparture(departureDate);

      const isTodayDeparture = isToday(departureDate);
      const departDayIndex = (departureDate.day() + 6) % 7;

      const { sortedResults, sortedPastDepartures } =
        FilterService.getFilterResults(
          originalRoutes,
          from,
          to,
          departDayIndex,
          isTodayDeparture
        );

      setSelectedDepartureStation(from);
      setSelectedArrivalStation(to);
      setRouteResults(sortedResults);
      setPastDepartures(sortedPastDepartures);
      setFixedIsToday(isTodayDeparture);
      setHasSearched(true);
      setShowSearchButton(true);
      setError(null);
    } else {
      setRouteResults([]);
      setPastDepartures([]);
      setHasSearched(false);
      setShowSearchButton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, stations, originalRoutes]);

  const handleFilterRoutes = () => {
    if (!tempDepartureStation || !tempArrivalStation) {
      setError("Molimo odaberite i polaznu i dolaznu stanicu.");
      return;
    }

    if (tempDepartureStation === tempArrivalStation) {
      setError("Molimo odaberite različite stanice polaska i dolaska.");
      return;
    }

    setError(null);

    const params = new URLSearchParams({
      from: tempDepartureStation,
      to: tempArrivalStation,
      date:
        dateOfDeparture?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD"),
    });

    router.push(`/?${params.toString()}`, { scroll: false });
    addStationsToHistory(tempDepartureStation, tempArrivalStation);
  };

  const handleSearchButtonClick = () => {
    setShowGame(!showGame);
  };

  const handleFavoriteSearch = (
    departureStationId: string,
    arrivalStationId: string
  ) => {
    setShowFavorites(false);
    const params = new URLSearchParams({
      from: departureStationId,
      to: arrivalStationId,
      date: dayjs().format("YYYY-MM-DD"),
    });
    router.push(`/?${params.toString()}`, { scroll: false });
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

      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="notranslate mb-3 text-4xl font-extrabold tracking-tight text-yellow-300 md:text-5xl">
              kadJeBus
            </h1>
            <h2 className="mx-auto max-w-3xl text-base text-zinc-300 md:text-xl">
              Aplikacija za prikaz informacija o redu vožnje javnog prevoza u Zenici.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-3xl border border-yellow-500/20 bg-zinc-950/80 p-6 shadow-[0_0_30px_rgba(234,179,8,0.08)] backdrop-blur-sm lg:col-span-3">
              <div className="mb-4 inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-300">
                Info
              </div>
              <h3 className="mb-3 text-2xl font-bold text-yellow-200">
                kadJeBusApp
              </h3>
              <p className="leading-7 text-zinc-300">
                kadJeBus je aplikacija koja Vam pomaže da lakše organizujete svoje svakodnevne obaveze i provjerite raspored linija javnog prevoza na području grada Zenice.
                 Sve lokacije i vremena polazaka prikazana su u skladu sa zvaničnim redom vožnje prevoznika. 
                 Za sve dodatne informacije ili eventualne nepravilnosti, molimo da se obratite nadležnom prevozniku.
              </p>
            </div>

            <div className="rounded-3xl border border-yellow-500/30 bg-zinc-950/90 p-6 shadow-[0_0_40px_rgba(234,179,8,0.12)] backdrop-blur-sm lg:col-span-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="mb-2 inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-300">
                    Pretraga
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-200 md:text-3xl">
                    Pronađi svoju liniju
                  </h3>
                </div>

                <div className="rounded-full border border-yellow-400/20 bg-black/30 px-4 py-2 text-sm text-zinc-300">
                  <GeolocationDisplay />
                </div>
              </div>

              <p className="mb-6 text-zinc-300">
                Izaberite polaznu i dolaznu stanicu te datum putovanja kako bi brzo
                pronašli odgovarajuće linije.
              </p>

              <div className="rounded-2xl border border-yellow-500/20 bg-black/30 p-4 md:p-5">
                <RouteSearch
 return (
  <>
    <Head>
      <title>kadJeBus</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-center mb-4 notranslate">kadJeBus</h1>
      <h2 className="text-xl text-center mb-2">
        Aplikacija za prikaz informacija o redu vožnje javnog prevoza u Zenici.
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
        historyArrivalStationIds={historyArrivalStationIds}
        historyDepartureStationIds={historyDepartureStationIds}
      />

      <div className="flex justify-center my-4">
        <Button
          color={showFavorites ? "primary" : "default"}
          variant={showFavorites ? "solid" : "bordered"}
          onClick={() => setShowFavorites(!showFavorites)}
          className="gap-2"
        >
          <Star className={`h-5 w-5 ${showFavorites ? "fill-yellow-400 text-yellow-400" : ""}`} />
          {showFavorites ? "Sakrij Favorite" : `Prikaži Favorite (${favorites.length})`}
        </Button>
      </div>

      {showFavorites && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Omiljene Linije</h2>
          <FavoritesList
            favorites={favorites}
            stations={stations}
            onRemove={removeFavorite}
            onSearch={handleFavoriteSearch}
          />
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {hasSearched && selectedDepartureStation && selectedArrivalStation && (
        <div className="flex justify-center mb-4">
          <FavoriteButton
            isFavorite={isFavorite(selectedDepartureStation, selectedArrivalStation)}
            onToggle={() => toggleFavorite(selectedDepartureStation, selectedArrivalStation)}
          />
        </div>
      )}

      {hasSearched && fixedIsToday && (
        <div className="text-xl font-semibold mb-4">Nadolazeći Polasci</div>
      )}

      {hasSearched && routeResults.length > 0 && (
        <div className="flex justify-center gap-2 mb-4">
          <Button
            color={viewMode === "card" ? "primary" : "default"}
            variant={viewMode === "card" ? "solid" : "bordered"}
            onClick={() => setViewMode("card")}
          >
            Prikaz Kartica
          </Button>
          <Button
            color={viewMode === "table" ? "primary" : "default"}
            variant={viewMode === "table" ? "solid" : "bordered"}
            onClick={() => setViewMode("table")}
          >
            Tabela Prikaz
          </Button>
        </div>
      )}

      {hasSearched && (
        <>
          {routeResults.length > 0 ? (
            <>
              {viewMode === "card" ? (
                <RouteGridView
                  routes={routeResults}
                  agencyNames={agencyNames}
                  stations={stations}
                  selectedDepartureStation={selectedDepartureStation}
                  selectedArrivalStation={selectedArrivalStation}
                  isToday={fixedIsToday}
                  calculateDuration={calculateDuration}
                />
              ) : (
                <RouteTableView
                  routes={routeResults}
                  agencyNames={agencyNames}
                  stations={stations}
                  selectedDepartureStation={tempDepartureStation}
                  selectedArrivalStation={tempArrivalStation}
                  setSelectedDepartureStation={setTempDepartureStation}
                  setSelectedArrivalStation={setTempArrivalStation}
                  dateOfDeparture={dateOfDeparture}
                  onDateChange={handleDateChange}
                  onFilter={handleFilterRoutes}
                  historyArrivalStationIds={historyArrivalStationIds}
                  historyDepartureStationIds={historyDepartureStationIds}
                />
              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-yellow-500/20 bg-zinc-950/80 p-6 shadow-[0_0_30px_rgba(249,115,22,0.08)] backdrop-blur-sm lg:col-span-3">
              <div className="mb-4 inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-300">
                Više
              </div>
              <h3 className="mb-3 text-2xl font-bold text-yellow-200">
                Kako koristiti aplikaciju?
              </h3>
              <p className="leading-7 text-zinc-300">
               Za pretragu linija jednostavno unesite polaznu stanicu i stanicu na koju želite stići. 
               Zatim odaberite datum koji Vas zanima kako biste provjerili dostupne polaske.
                Nakon toga možete pregledati sve dostupne linije i planirati svoju vožnju.
              </p>
            </div>
          </div>

          {hasSearched && fixedIsToday && (
            <div className="mt-10 mb-4 text-center text-2xl font-semibold text-yellow-200">
              Nadolazeći Polasci
            </div>
          )}

          {hasSearched && routeResults.length > 0 && (
            <div className="mt-6 mb-6 flex justify-center gap-3">
              <Button
                color={viewMode === "card" ? "warning" : "default"}
                variant={viewMode === "card" ? "solid" : "bordered"}
                onClick={() => setViewMode("card")}
                className="font-semibold"
              >
                Prikaz Kartica
              </Button>
              <Button
                color={viewMode === "table" ? "warning" : "default"}
                variant={viewMode === "table" ? "solid" : "bordered"}
                onClick={() => setViewMode("table")}
                className="font-semibold"
              >
                Tabela Prikaz
              </Button>
            </div>
          )}

          {hasSearched && (
            <div className="mt-4">
              {routeResults.length > 0 ? (
                <>
                  {viewMode === "card" ? (
                    <RouteGridView
                      routes={routeResults}
                      agencyNames={agencyNames}
                      stations={stations}
                      selectedDepartureStation={selectedDepartureStation}
                      selectedArrivalStation={selectedArrivalStation}
                      isToday={fixedIsToday}
                      calculateDuration={calculateDuration}
                    />
                  ) : (
                    <RouteTableView
                      routes={routeResults}
                      agencyNames={agencyNames}
                      stations={stations}
                      selectedDepartureStation={selectedDepartureStation}
                      selectedArrivalStation={selectedArrivalStation}
                      isToday={fixedIsToday}
                      calculateDuration={calculateDuration}
                    />
                  )}
                </>
              ) : (
                <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-zinc-950/70 p-6 text-center text-zinc-300">
                  Nema pronađenih linija.
                </div>
              )}

              {showSearchButton && (
                <div className="mt-6 mb-4 flex justify-center">
                  <Button
                    color="warning"
                    onClick={handleSearchButtonClick}
                    className="font-semibold"
                  >
                    {showGame ? "Sakrij igru" : "Igraj Flappy Bird"}
                  </Button>
                </div>
              )}

              {showGame && (
                <div className="mt-4 mb-8 rounded-3xl border border-yellow-500/20 bg-zinc-950/80 p-6 text-center">
                  <h3 className="mb-4 text-xl font-semibold text-yellow-200">
                    Uživajte u igri dok čekate!
                  </h3>
                  <div
                    className={`relative mx-auto overflow-hidden rounded-2xl border border-yellow-500/20 transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "h-[80vh] w-full"
                        : "h-[600px] w-full max-w-[400px]"
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
                    className="mt-4 font-semibold"
                  >
                    {isExpanded ? "Smanji igru" : "Proširi igru"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {hasSearched && fixedIsToday && pastDepartures.length > 0 && (
            <div className="mt-10">
              <div
                className="mx-auto mb-4 flex w-full max-w-3xl cursor-pointer items-center justify-between rounded-2xl border border-yellow-500/20 bg-zinc-950/70 p-5 text-xl font-semibold text-yellow-200"
                onClick={togglePastDepartures}
              >
                <span>Prošli Polasci</span>
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className="underline">
                    {isPastDeparturesExpanded ? "Sakrij" : "Prikaži"}
                  </span>
                  <span>{isPastDeparturesExpanded ? "▲" : "▼"}</span>
                </div>
              </div>

              {isPastDeparturesExpanded &&
                (viewMode === "card" ? (
                  <RouteGridView
                    routes={pastDepartures}
                    agencyNames={agencyNames}
                    stations={stations}
                    selectedDepartureStation={selectedDepartureStation}
                    selectedArrivalStation={selectedArrivalStation}
                    isToday={fixedIsToday}
                    calculateDuration={calculateDuration}
                  />
                ) : (
                  <RouteTableView
                    routes={pastDepartures}
                    agencyNames={agencyNames}
                    stations={stations}
                    selectedDepartureStation={selectedDepartureStation}
                    selectedArrivalStation={selectedArrivalStation}
                    isToday={fixedIsToday}
                    calculateDuration={calculateDuration}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;