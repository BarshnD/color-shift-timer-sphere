
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileAudio2, BellRing } from 'lucide-react';

interface SoundSettingsProps {
  onCustomSoundChange: (sound: string) => void;
}

export const SoundSettings = ({ onCustomSoundChange }: SoundSettingsProps) => {
  const [hasCustomSound, setHasCustomSound] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onCustomSoundChange(url);
      setHasCustomSound(true);
    }
  };

  return (
    <div className="absolute top-4 right-4">
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <Button
        variant="outline"
        size="icon"
        className="bg-white/5 hover:bg-white/10 border-white/10"
        onClick={() => fileInputRef.current?.click()}
      >
        {hasCustomSound ? <BellRing className="h-4 w-4" /> : <FileAudio2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};
