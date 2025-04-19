
import { useState, useEffect } from 'react';
import { TimerButton } from './TimerButton';
import { CustomTimeSlider } from './CustomTimeSlider';

export const Timer = () => {
  const [timeInMinutes, setTimeInMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(timeInMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleTimeSelect = (minutes: number) => {
    setTimeInMinutes(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(true);
  };

  const handleCustomTimeChange = (minutes: number) => {
    setTimeInMinutes(minutes);
    setTimeLeft(minutes * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1029] to-[#1A2151] flex flex-col items-center justify-center gap-8">
      <div className="text-white text-6xl font-mono mb-8">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
      <TimerButton onTimeSelect={handleTimeSelect} />
      
      <CustomTimeSlider 
        value={timeInMinutes}
        onChange={handleCustomTimeChange}
      />
    </div>
  );
};
