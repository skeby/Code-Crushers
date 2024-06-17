import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { times } from "@/static";
import { FormControl } from "./ui/form";

interface Props {
  onTimeChange: (time: Date) => void;
}

const TimeSelector = ({ onTimeChange }: Props) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();

  // Effect to call onTimeChange when both date and time are set
  useEffect(() => {
    if (date && time) {
      const [hours, minutes, period] = time.split(/[: ]/);
      const hour =
        period === "PM" ? (parseInt(hours) % 12) + 12 : parseInt(hours) % 12;
      const selectedDateTime = new Date(date);
      selectedDateTime.setHours(hour);
      selectedDateTime.setMinutes(parseInt(minutes));
      onTimeChange(selectedDateTime);
    }
  }, [date, time]);

  return (
    <div className="flex items-center gap-x-2">
      <Popover>
        <PopoverTrigger asChild className="w-full">
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "h-9 justify-start text-left font-normal",
                !date && "!bg-transparent"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Select onValueChange={setTime}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Times</SelectLabel>
            {times.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelector;
