import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface DynamicModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<DynamicModalProps> = ({
                                               isOpen,
                                               onClose,
                                               title = "Modal Title",
                                               children,
                                           }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '12px',
                    backgroundColor: 'var(--shadcd-bg)', // Example variable; adjust to match your theme
                    color: 'var(--shadcd-text)', // Example variable; adjust as needed
                },
            }}
        >
            {/* Dynamic title */}
            {title && (
                <DialogTitle sx={{ padding: '16px', textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}
                             className="bg-white"
                >
                    {title}
                </DialogTitle>
            )}

            {/* Body content */}
            <DialogContent sx={{ padding: '16px', maxHeight: '85vh', overflowY: 'auto' }} className="bg-white">
                {children}
            </DialogContent>

            {/* Footer actions */}
            <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }} className="bg-white">
                <Button
                    onClick={onClose}
                    className="bg-indigo-400 rounded p-2 text-white hover:bg-indigo-500"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
