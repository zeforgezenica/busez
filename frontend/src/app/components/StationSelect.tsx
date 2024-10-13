import React from 'react';
import Select from 'react-select';
import { Station } from '../models/station.model';
import { customSelectStyles } from '../routes/routeSearchStyles';

interface StationSelectProps {
  stations: Station[];
  selectedStation: string | null;
  setSelectedStation: (stationId: string | null) => void;
  placeholder: string;
}

const StationSelect: React.FC<StationSelectProps> = ({
  stations,
  selectedStation,
  setSelectedStation,
  placeholder,
}) => {
  const stationOptions = stations.map((station) => ({
    value: station._id ?? '',
    label: station.name,
  }));

  const handleChange = (selectedOption: any) => {
    const selectedValue = selectedOption ? selectedOption.value : null;
    setSelectedStation(selectedValue);
  };

  return (
    <Select
      options={stationOptions}
      value={stationOptions.find((option) => option.value === selectedStation)}
      onChange={handleChange}
      placeholder={placeholder}
      styles={customSelectStyles}
      className='w-full md:w-2/3 lg:w-1/2 mx-auto'
    />
  );
};

export default StationSelect;
