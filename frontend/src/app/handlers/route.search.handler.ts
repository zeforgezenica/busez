import { TFunction } from 'i18next';
import '../i18n'; // Import i18n configuration

export const handleFilterClick = (
  selectedDepartureStation: string | null,
  selectedArrivalStation: string | null,
  onFilter: () => void,
  setError: (error: string | null) => void,
  t: (key: string) => string
) => {
  if (!selectedDepartureStation || !selectedArrivalStation) {
    setError(t('pleaseSelectStations'));
    return;
  }

  if (selectedDepartureStation === selectedArrivalStation) {
    setError(t('selectDifferentStations'));
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
  const tempDeparture = selectedDepartureStation;
  const tempArrival = selectedArrivalStation;
  setSelectedDepartureStation(tempArrival);
  setSelectedArrivalStation(tempDeparture);
};
