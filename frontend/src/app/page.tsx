"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button, Card } from "@shadcn/ui"; // shadcn components
import AgencyService from "../../services/agency.service";
import { Agency } from "../../models/agency.model";
import { City } from "../../models/city.model";
import CityService from "../../services/city.service";

const AgencyPage: React.FC = () => {
  const [agency, setAgency] = useState<Agency | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const fetchedAgency = await AgencyService.getAgency(id as string);
        setAgency(fetchedAgency);
        const fetchedCity = await CityService.getCity(fetchedAgency.cityId);
        setCity(fetchedCity);
      } catch (error) {
        console.error("Error fetching agency:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAgency();
    }
  }, [id]);

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error || !agency) {
    return <p>Agencija nije pronađena.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">{agency.name}</h1>
      <Card className="p-6 shadow">
        <p>
          <strong>Adresa:</strong>{" "}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              agency.address + " " + (city?.name || "")
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {agency.address}, {city ? city.name : "Unknown"}
          </a>
        </p>
        <p>
          <strong>Web stranica:</strong>{" "}
          {agency.website ? (
            <a
              href={agency.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              {agency.website}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>E-pošta:</strong>{" "}
          <a href={`mailto:${agency.email}`} className="text-primary underline">
            {agency.email}
          </a>
        </p>
        <p>
          <strong>Broj telefona:</strong>{" "}
          <a href={`tel:${agency.phoneNumber}`} className="text-primary underline">
            {agency.phoneNumber}
          </a>
        </p>
        <p>
          <strong>Grad:</strong>{" "}
          <span className="text-primary">{city ? city.name : "Unknown"}</span>
        </p>

        {/* Example of adding buttons */}
        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={() => window.location.href = `mailto:${agency.email}`}>
            Send Email
          </Button>
          <Button variant="outline" onClick={() => window.location.href = `tel:${agency.phoneNumber}`}>
            Call Agency
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AgencyPage;
