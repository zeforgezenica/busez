import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import RouteProgressStepper from "@/routes/RouteProgressStepper";

interface RouteDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: any; // Define the type based on your model
  currentTime: string;
  departureStationId: string | null;
  arrivalStationId: string | null;
  isToday: boolean | null;
  eta: string;
  screenWidth: number;
}

const RouteDetailsModal: React.FC<RouteDetailsModalProps> = ({
  isOpen,
  onClose,
  route,
  currentTime,
  departureStationId,
  arrivalStationId,
  isToday,
  eta,
  screenWidth,
}) => {
  const modalBodyStyle: React.CSSProperties = {
    maxHeight: "calc(100vh * 0.7)",
    overflowY: "auto",
    marginTop: "0",
    padding: screenWidth <= 375 ? "0" : "16px",
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      isDismissable
      hideCloseButton
      placement="center"
      scrollBehavior="inside"
      classNames={{
        backdrop: "bg-black/70 backdrop-blur-sm",
        base: "bg-zinc-900 text-white border border-white/10 shadow-2xl rounded-2xl",
      }}
    >
      <ModalContent className="max-w-2xl">
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between gap-3 border-b border-white/10">
              <span>Detalji Linije</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </ModalHeader>
            <ModalBody style={modalBodyStyle}>
              <RouteProgressStepper
                stations={route.stations}
                currentTime={currentTime}
                departureStationId={departureStationId}
                arrivalStationId={arrivalStationId}
                isToday={isToday}
              />
            </ModalBody>
            <ModalFooter className="border-t border-white/10 flex items-center justify-end gap-3">
              {isToday && eta && (
                <div className="mr-auto" style={{ color: "var(--accent-orange)" }}>
                  <p>{eta}</p>
                </div>
              )}
              <Button
                variant="ghost"
                onClick={onClose}
                className="hover:bg-white/10 transition-colors"
              >
                Zatvori
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RouteDetailsModal;
