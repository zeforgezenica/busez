"use client";

import React from "react";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <WifiOff className="w-24 h-24 mb-6 text-muted-foreground" />
            <h1 className="text-4xl font-bold mb-4">You are offline</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Please check your internet connection to continue using the app.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
            >
                Try Again
            </button>
        </div>
    );
}
