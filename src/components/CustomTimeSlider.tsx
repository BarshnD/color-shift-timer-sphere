
import * as React from "react";
import { Slider } from "@/components/ui/slider";

interface CustomTimeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const CustomTimeSlider = ({ value, onChange }: CustomTimeSliderProps) => {
  const handleValueChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  return (
    <div className="w-64 mt-8">
      <div className="mb-2 text-white/80 text-sm">Custom Time: {value} minutes</div>
      <Slider
        defaultValue={[value]}
        max={60}
        min={1}
        step={1}
        className="bg-white/10 rounded-full"
        onValueChange={handleValueChange}
      />
    </div>
  );
};
