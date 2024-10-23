import { useEffect, useState } from "react";

type UseSearchHistoryProps = {
  selectedDepartureStation: string | null;
  selectedArrivalStation: string | null;
};

export const useSearchHistory = ({
  selectedDepartureStation,
  selectedArrivalStation,
}: UseSearchHistoryProps) => {
  const historyDepartureStationIds = useSearchHistoryForStation(
    selectedDepartureStation
  );
  const historyArrivalStationIds = useSearchHistoryForStation(
    selectedArrivalStation
  );

  return {
    historyDepartureStationIds,
    historyArrivalStationIds,
  };
};

const useSearchHistoryForStation = (newStation: string | null) => {
  const [stationHistory, setStationHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!newStation) return;
    if (newStation === stationHistory[stationHistory.length - 1]) return;

    const newStationHistory = [...stationHistory];
    // remove station from history if it already exists
    const existingStationIndex = newStationHistory.indexOf(newStation);
    if (existingStationIndex !== -1)
      newStationHistory.splice(existingStationIndex, 1);
    // limit history to 5
    if (newStationHistory.length >= 5) newStationHistory.shift();
    // add the new station on top of history
    setStationHistory([...newStationHistory, newStation]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStation, setStationHistory]);

  return stationHistory;
};
