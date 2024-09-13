"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "@nextui-org/react";
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
    return <p>Loading...</p>;
  }

  if (error || !agency) {
    return <p>Agency not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">{agency.name}</h1>
      <Card shadow="sm" className="p-6">
        <p>
          <strong>Address:</strong>{" "}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              agency.address + " " + (city?.name || "")
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--primary-blue)",
              textDecoration: "underline",
            }}
          >
            {agency.address}, {city ? city.name : "Unknown"}
          </a>
        </p>
        <p>
          <strong>Website:</strong>{" "}
          {agency.website ? (
            <a
              href={agency.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--primary-blue)",
                textDecoration: "underline",
              }}
            >
              {agency.website}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href={`mailto:${agency.email}`}
            style={{
              color: "var(--primary-blue)",
              textDecoration: "underline",
            }}
          >
            {agency.email}
          </a>
        </p>
        <p>
          <strong>Phone Number:</strong>{" "}
          <a
            href={`tel:${agency.phoneNumber}`}
            style={{
              color: "var(--primary-blue)",
              textDecoration: "underline",
            }}
          >
            {agency.phoneNumber}
          </a>
        </p>
        <p>
          <strong>City:</strong>{" "}
          <span
            style={{
              color: "var(--primary-blue)",
            }}
          >
            {city ? city.name : "Unknown"}
          </span>
        </p>
      </Card>
    </div>
  );
};

export default AgencyPage;
