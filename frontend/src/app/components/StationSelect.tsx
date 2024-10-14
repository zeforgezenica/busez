import React from 'react';
import Select from 'react-select';
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const stationOptions = stations.map((station) => ({
    value: station._id ?? '',
    label: station.name,
  }));

  const handleChange = (selectedOption: any) => {
    const selectedValue = selectedOption ? selectedOption.value : null;
    setSelectedStation(selectedValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          {/* <CommandList>
            <CommandEmpty>No bus today.</CommandEmpty>
          </CommandList> */}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StationSelect;
