"use client";

import React from "react";
import DynamicTable from "../components/DynamicTable";

export default function Agencies() {
  const apiUrl = "http://localhost:3000/agencies";
  const columns = [
    { key: "_id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "address", label: "Address" },
    { key: "website", label: "Website" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">Agencies</h1>
      <DynamicTable apiUrl={apiUrl} columns={columns} />
    </>
  );
}
