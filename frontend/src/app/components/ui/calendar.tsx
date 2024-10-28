import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("mr-0 sm:mr-20", className)}
            classNames={{
                months: "",
                month: "flex flex-col space-y-6",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-xl text-neutral-500 font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-indigo-500 p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1 bg-gray-500 text-white",
                nav_button_next: "absolute right-1 bg-gray-500 text-white",
                table: "w-full border-collapse",
                head_row: "flex justify-between",
                head_cell: cn(
                    "text-muted-foreground ml-1.5 font-medium text-center text-[0.8rem]",
                    "flex-1"
                ),
                row: "flex justify-between w-full",
                cell: cn(
                    "relative p-1 text-center text-sm focus-within:relative focus-within:z-20",
                    props.mode === "range"
                        ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                        : "[&:has([aria-selected])]:rounded-md",
                    "flex-1 aspect-square sm:h-24 sm:w-24 h-12 w-12"
                ),
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "flex items-center justify-center w-full h-full bg-white font-normal"
                ),
                day_range_start: "day-range-start",
                day_range_end: "day-range-end",
                day_selected:
                    "p-1 !bg-indigo-500 text-primary-foreground hover:bg-indigo-500 hover:text-primary-foreground focus:bg-indigo-500 focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside:
                    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
                IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };