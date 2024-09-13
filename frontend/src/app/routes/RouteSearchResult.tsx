"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { RouteLap } from "../models/route.model";
import Station from "../models/station.model";
import RouteProgressStepper from "./RouteProgressStepper";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

interface RouteSearchResultProps {
  route: RouteLap;
  agencyName: string;
  departureStationId: string | null;
  arrivalStationId: string | null;
  departureTime: string;
  arrivalTime: string;
  deltaTime: number;
  stations: Station[];
  isToday: boolean | null;
}

const RouteSearchResult: React.FC<RouteSearchResultProps> = ({
  route,
  agencyName,
  departureStationId,
  arrivalStationId,
  departureTime,
  arrivalTime,
  deltaTime,
  stations,
  isToday: initialIsToday,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm:ss"));
  const [isToday, setIsToday] = useState<boolean | null>(initialIsToday);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setIsToday(initialIsToday);
  }, [initialIsToday]);

  const departureStation = stations.find(
    (station) => station._id === departureStationId
  );
  const arrivalStation = stations.find(
    (station) => station._id === arrivalStationId
  );

  const handleNavigate = () => {
    router.push(`/agency/${route.agencyId}`);
  };

  return (
    <Card shadow="sm" className="p-6 mb-4 w-full md:w-2/3 lg:w-1/2 mx-auto">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 className="text-2xl mb-2">{route.name}</h2>
        <p
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={handleNavigate}
        >
          {agencyName}
        </p>
        <h3>
          {departureStation?.name || "Unknown Departure Station"}:{" "}
          {departureTime}
          <ArrowRightAltIcon />
          {arrivalStation?.name || "Unknown Arrival Station"}: {arrivalTime}
        </h3>
        <p>Duration: {deltaTime} minutes</p>
        <Button variant="flat" color="warning" onPress={onOpen}>
          See Route Details
        </Button>

        <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Route Details
                </ModalHeader>
                <ModalBody
                  style={{
                    maxHeight: "calc(100vh * .7)",
                    overflowY: "auto",
                    marginTop: "0",
                  }}
                >
                  <RouteProgressStepper
                    stations={route.stations}
                    currentTime={currentTime}
                    departureStationId={departureStationId}
                    arrivalStationId={arrivalStationId}
                    isToday={isToday}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </Card>
  );
};

export default RouteSearchResult;
