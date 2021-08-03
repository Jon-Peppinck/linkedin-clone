/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'linkedin',
  webDir: 'build',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
  },
};

export default config;
