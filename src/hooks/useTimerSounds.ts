
import { useRef, useCallback, useEffect } from 'react';

export const useTimerSounds = () => {
  const customSoundRef = useRef<string>('');
  const defaultSoundRef = useRef<AudioBuffer | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synth = useRef<SpeechSynthesisUtterance>();

  // Initialize audio context and load default sound
  useEffect(() => {
    // Create AudioContext only on client side
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      
      // Create a simple beep sound as default
      const createDefaultSound = () => {
        const ctx = audioContextRef.current;
        if (!ctx) return;
        
        const sampleRate = ctx.sampleRate;
        const duration = 1;  // 1 second beep
        const frameCount = sampleRate * duration;
        
        const audioBuffer = ctx.createBuffer(1, frameCount, sampleRate);
        const channelData = audioBuffer.getChannelData(0);
        
        // Create a simple beep sound (sine wave at 440Hz)
        for (let i = 0; i < frameCount; i++) {
          // Simple beeping pattern
          const beepFreq = 440;
          channelData[i] = Math.sin(2 * Math.PI * beepFreq * i / sampleRate) * 0.5;
        }
        
        defaultSoundRef.current = audioBuffer;
      };
      
      createDefaultSound();
    }
  }, []);

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

  const playDefaultSound = useCallback(() => {
    if (!audioContextRef.current || !defaultSoundRef.current) return;
    
    // Resume context if it's suspended (needed for some browsers)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = defaultSoundRef.current;
    source.connect(audioContextRef.current.destination);
    source.start();
  }, []);

  const playCustomSound = useCallback(() => {
    if (customSoundRef.current) {
      const audio = new Audio(customSoundRef.current);
      audio.play().catch(console.error);
    } else {
      // If no custom sound is set, play the default sound
      playDefaultSound();
    }
  }, [playDefaultSound]);

  const setCustomSound = useCallback((soundUrl: string) => {
    customSoundRef.current = soundUrl;
  }, []);

  return { speak, playCustomSound, setCustomSound };
};
