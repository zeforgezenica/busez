export const handleFilterClick = (
    selectedDepartureStation: string | null,
    selectedArrivalStation: string | null,
    onFilter: () => void,
    setError: (error: string | null) => void
) => {
  if (selectedDepartureStation === selectedArrivalStation && selectedArrivalStation !== null) {
    setError("Molimo odaberite različite stanice polaska i dolaska.");
    return;
  }

  setError(null);
  onFilter();
};

export const handleSwapStations = (
    selectedDepartureStation: string | null,
    selectedArrivalStation: string | null,
    setSelectedDepartureStation: (stationId: string | null) => void,
    setSelectedArrivalStation: (stationId: string | null) => void
) => {
  if (selectedDepartureStation && !selectedArrivalStation) {
    setSelectedArrivalStation(selectedDepartureStation);
    setSelectedDepartureStation(null);
  } else if (!selectedDepartureStation && selectedArrivalStation) {
    setSelectedDepartureStation(selectedArrivalStation);
    setSelectedArrivalStation(null);
  } else {
    const tempDeparture = selectedDepartureStation;
    const tempArrival = selectedArrivalStation;
    setSelectedDepartureStation(tempArrival);
    setSelectedArrivalStation(tempDeparture);
  }
};
