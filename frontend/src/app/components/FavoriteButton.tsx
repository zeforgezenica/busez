"use client";

import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
}) => {
  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      onClick={onToggle}
      className="gap-2"
    >
      <Star
        className={`h-5 w-5 ${
          isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
        }`}
      />
      {isFavorite ? "Ukloni iz Favorita" : "Dodaj u Favorite"}
    </Button>
  );
};

export default FavoriteButton;
