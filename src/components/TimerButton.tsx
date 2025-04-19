
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

const PRESET_TIMES = [
  { minutes: 5, color: 'bg-emerald-500', size: 'h-48 w-48' },
  { minutes: 10, color: 'bg-amber-400', size: 'h-44 w-44' },
  { minutes: 15, color: 'bg-purple-500', size: 'h-40 w-40' },
  { minutes: 20, color: 'bg-orange-500', size: 'h-36 w-36' },
  { minutes: 25, color: 'bg-sky-500', size: 'h-32 w-32' },
  { minutes: 30, color: 'bg-violet-500', size: 'h-28 w-28' },
];

interface TimerButtonProps {
  onTimeSelect: (minutes: number) => void;
}

export const TimerButton = ({ onTimeSelect }: TimerButtonProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);

  const handleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime;

    if (timeSinceLastTap < 300) { // Double tap threshold
      setCurrentIndex((prev) => (prev + 1) % PRESET_TIMES.length);
    }

    setLastTapTime(now);
    onTimeSelect(PRESET_TIMES[currentIndex].minutes);
  };

  return (
    <button
      onClick={handleTap}
      className={cn(
        "transform transition-all duration-300 ease-out rounded-lg shadow-lg hover:scale-105",
        "flex items-center justify-center text-white font-bold text-3xl",
        "hover:shadow-xl active:scale-95",
        PRESET_TIMES[currentIndex].color,
        PRESET_TIMES[currentIndex].size
      )}
      style={{
        transform: "perspective(1000px) rotateX(10deg)",
      }}
    >
      {PRESET_TIMES[currentIndex].minutes} min
    </button>
  );
};
