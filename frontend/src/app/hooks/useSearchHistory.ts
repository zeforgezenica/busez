import { useEffect, useState } from 'react';

export const useSearchHistory = () => {
  const {
    history: historyDepartureStationIds,
    addStation: addDepartureStation,
  } = useSearchHistoryForStation();
  const { history: historyArrivalStationIds, addStation: addArrivalStation } =
    useSearchHistoryForStation();

  function addStationsToHistory(
    departureStation: string | null,
    arrivalStation: string | null
  ) {
    addDepartureStation(departureStation);
    addArrivalStation(arrivalStation);
  }

  return {
    historyDepartureStationIds,
    historyArrivalStationIds,
    addStationsToHistory,
  };
};

const useSearchHistoryForStation = () => {
  const [history, setHistory] = useState<string[]>([]);

  function addStation(newStation: string | null) {
    if (!newStation) return;
    if (newStation === history[history.length - 1]) return;

    const newStationHistory = [...history];
    // remove station from history if it already exists
    const existingStationIndex = newStationHistory.indexOf(newStation);
    if (existingStationIndex !== -1)
      newStationHistory.splice(existingStationIndex, 1);
    // limit history to 5
    if (newStationHistory.length >= 5) newStationHistory.shift();
    // add the new station on top of history
    setHistory([...newStationHistory, newStation]);
  }

  return { history, addStation };
};
