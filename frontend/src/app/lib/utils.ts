import Station from '@/models/station.model';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSortedStationsAlphabetically(stations:Station[]):Station[] {
  return stations.toSorted((a,b)=>a.name.localeCompare(b.name));
}