
import { useState, useEffect } from 'react';
import { TimerButton } from './TimerButton';
import { CustomTimeSlider } from './CustomTimeSlider';
import { SoundSettings } from './SoundSettings';
import { useTimerSounds } from '@/hooks/useTimerSounds';

export const Timer = () => {
  const [timeInMinutes, setTimeInMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(timeInMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const { speak, playCustomSound, setCustomSound } = useTimerSounds();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          // Handle countdown voice
          if (newTime <= 3 && newTime > 0) {
            speak(String(newTime));
          } else if (newTime === 0) {
            playCustomSound();
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, speak, playCustomSound]);

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
    <div className="min-h-screen bg-gradient-to-b from-[#0A1029] to-[#1A2151] flex flex-col items-center justify-center gap-8 relative">
      <SoundSettings onCustomSoundChange={setCustomSound} />
      
      <div className="text-white text-8xl font-mono mb-8 tracking-wider glass-morphism px-8 py-4 rounded-xl">
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
