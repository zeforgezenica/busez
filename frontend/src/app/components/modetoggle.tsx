"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";


export const ModeToggle: React.FC = () => {
    const { setTheme } = useTheme();
    const [light, setLight] = React.useState(false);
    const modetoggler = () => {
        setLight(!light);
        if (!light) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <Button variant="outline" size="icon" onClick={modetoggler}>
            {light ?<Sun  />: <Moon/>}            
        </Button>
    );
};
