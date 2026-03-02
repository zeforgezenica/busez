"use client";

import { useLocalStorage } from "@uidotdev/usehooks";

export interface FavoriteRoute {
  departureStationId: string;
  arrivalStationId: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteRoute[]>(
    "favoriteRoutes",
    []
  );

  const isFavorite = (
    departureStationId: string,
    arrivalStationId: string
  ): boolean => {
    return favorites.some(
      (fav) =>
        fav.departureStationId === departureStationId &&
        fav.arrivalStationId === arrivalStationId
    );
  };

  const addFavorite = (
    departureStationId: string,
    arrivalStationId: string
  ) => {
    if (isFavorite(departureStationId, arrivalStationId)) return;
    setFavorites([...favorites, { departureStationId, arrivalStationId }]);
  };

  const removeFavorite = (
    departureStationId: string,
    arrivalStationId: string
  ) => {
    setFavorites(
      favorites.filter(
        (fav) =>
          !(
            fav.departureStationId === departureStationId &&
            fav.arrivalStationId === arrivalStationId
          )
      )
    );
  };

  const toggleFavorite = (
    departureStationId: string,
    arrivalStationId: string
  ) => {
    if (isFavorite(departureStationId, arrivalStationId)) {
      removeFavorite(departureStationId, arrivalStationId);
    } else {
      addFavorite(departureStationId, arrivalStationId);
    }
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
};
