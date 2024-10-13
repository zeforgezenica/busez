import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import { Button } from '@/components/ui/button';
import RouteProgressStepper from '@/routes/RouteProgressStepper';

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
    maxHeight: 'calc(100vh * 0.7)',
    overflowY: 'auto',
    marginTop: '0',
    padding: screenWidth <= 375 ? '0' : '16px',
  };

  return (
    <Modal backdrop='opaque' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Detalji Linije
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
            <ModalFooter
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {isToday && eta && (
                <div style={{ color: 'var(--accent-orange)' }}>
                  <p>{eta}</p>
                </div>
              )}
              <Button
                variant='ghost'
                onClick={onClose}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    'rgba(255, 0, 0, 0.1)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
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
