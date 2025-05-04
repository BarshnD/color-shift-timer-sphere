
import { useState, useEffect } from 'react';
import { TimerButton } from './TimerButton';
import { CustomTimeSlider } from './CustomTimeSlider';
import { SoundSettings } from './SoundSettings';
import { useTimerSounds } from '@/hooks/useTimerSounds';
import { Clock, CircleStop } from 'lucide-react';
import { Button } from './ui/button';

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

  const handleStopTimer = () => {
    setIsRunning(false);
    setTimeLeft(timeInMinutes * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#403E43] flex flex-col items-center justify-center gap-8 relative">
      <div className="absolute top-8 left-8">
        <Clock className="text-white w-8 h-8" />
      </div>
      
      <SoundSettings onCustomSoundChange={setCustomSound} />
      
      <div className="text-white text-8xl font-mono mb-8 tracking-wider glass-morphism px-8 py-4 rounded-xl">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
      <div className="flex flex-row gap-4 items-center">
        <TimerButton onTimeSelect={handleTimeSelect} />
        
        {isRunning && (
          <Button 
            variant="destructive" 
            size="lg" 
            className="rounded-full h-16 w-16 flex items-center justify-center"
            onClick={handleStopTimer}
          >
            <CircleStop className="h-8 w-8" />
          </Button>
        )}
      </div>
      
      <CustomTimeSlider 
        value={timeInMinutes}
        onChange={handleCustomTimeChange}
      />
    </div>
  );
};
