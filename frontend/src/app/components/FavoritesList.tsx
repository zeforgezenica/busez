"use client";

import React from "react";
import { Star, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Station from "../models/station.model";
import { FavoriteRoute } from "../hooks/useFavorites";
import dayjs from "dayjs";

interface FavoritesListProps {
  favorites: FavoriteRoute[];
  stations: Station[];
  onRemove: (departureStationId: string, arrivalStationId: string) => void;
  onSearch: (departureStationId: string, arrivalStationId: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  stations,
  onRemove,
  onSearch,
}) => {
  const getStationName = (stationId: string): string => {
    const station = stations.find((s) => s._id === stationId);
    return station?.name || "Nepoznata stanica";
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <Star className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
        <p className="text-lg">Nemate sačuvanih favorita.</p>
        <p className="text-sm mt-1">
          Pretražite linije i dodajte ih u favorite za brži pristup.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-[1400px] mx-auto px-6 py-4">
      {favorites.map((fav) => {
        const departureName = getStationName(fav.departureStationId);
        const arrivalName = getStationName(fav.arrivalStationId);

        return (
          <Card
            key={`${fav.departureStationId}-${fav.arrivalStationId}`}
            className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg truncate">
                    {departureName}
                  </p>
                  <p className="text-muted-foreground text-sm">→</p>
                  <p className="font-semibold text-lg truncate">
                    {arrivalName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() =>
                    onSearch(fav.departureStationId, fav.arrivalStationId)
                  }
                >
                  <Search className="h-4 w-4" />
                  Pretraži
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                  onClick={() =>
                    onRemove(fav.departureStationId, fav.arrivalStationId)
                  }
                >
                  <Trash2 className="h-4 w-4" />
                  Ukloni
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default FavoritesList;
