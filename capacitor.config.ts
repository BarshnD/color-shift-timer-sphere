
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4123f9ae87984b3d9f1ec6867a87b9b0',
  appName: 'Start',
  webDir: 'dist',
  server: {
    url: 'https://4123f9ae-8798-4b3d-9f1e-c6867a87b9b0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      backgroundColor: "#1A1F2C", // Dark theme background
      launchAutoHide: true,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    }
  }
};

export default config;
