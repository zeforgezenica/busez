import React, { useState, useEffect } from 'react';
import InfoIcon from '@mui/icons-material/Info';

function Notification({ message = "Notification", color = 'gray', icon: Icon = InfoIcon }) {
    const [isVisible, setIsVisible] = useState(false);
    const duration = 3000; // Static duration of 3 seconds
    const dynamicColorClass = `bg-${color}-400`;

    useEffect(() => {
        setIsVisible(true); // Show notification when component mounts
        const timer = setTimeout(() => {
            setIsVisible(false); // Auto-hide after the duration
        }, duration);
        return () => clearTimeout(timer); // Clear timer if component unmounts
    }, []);

    return (
        <div
            className={`fixed top-12 sm:right-5 py-2 px-3 rounded transition-transform duration-500 ease-out flex items-center gap-2 ${
                isVisible ? 'transform translate-y-0 sm:translate-x-0 opacity-100' : 'transform translate-y-full sm:translate-y-0 sm:translate-x-full opacity-0'
            } bg-red-400`} // Use the dynamically constructed class
        >
            {Icon && <Icon className="text-white w-5 h-5"/>}
            <div className="text-white">{message}</div>
        </div>
    );
}

export default Notification;