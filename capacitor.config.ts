import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ru.onlamp.invest_flow',
  appName: 'investFlow',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
