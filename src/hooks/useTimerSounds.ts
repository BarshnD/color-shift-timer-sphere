
import { useRef, useCallback } from 'react';

export const useTimerSounds = () => {
  const customSoundRef = useRef<string>('');
  const synth = useRef<SpeechSynthesisUtterance>();

  const initializeSpeech = useCallback(() => {
    if (!synth.current) {
      synth.current = new SpeechSynthesisUtterance();
      synth.current.rate = 1;
      synth.current.pitch = 1;
      synth.current.volume = 1;
    }
  }, []);

  const speak = useCallback((text: string) => {
    initializeSpeech();
    if (synth.current) {
      synth.current.text = text;
      window.speechSynthesis.speak(synth.current);
    }
  }, [initializeSpeech]);

  const playCustomSound = useCallback(() => {
    if (customSoundRef.current) {
      const audio = new Audio(customSoundRef.current);
      audio.play().catch(console.error);
    }
  }, []);

  const setCustomSound = useCallback((soundUrl: string) => {
    customSoundRef.current = soundUrl;
  }, []);

  return { speak, playCustomSound, setCustomSound };
};
