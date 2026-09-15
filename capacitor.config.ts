import type { CapacitorConfig } from '@capacitor/cli';

const appUrl = process.env.CAPACITOR_SERVER_URL || 'https://nivostudy-dnmtfe3-cpus-projects.vercel.app';

const config: CapacitorConfig = {
  appId: 'com.nivostudy.app',
  appName: 'NivoStudy',
  webDir: 'native-web',
  server: {
    url: appUrl,
    cleartext: false,
    allowNavigation: [
      'nivostudy-dnmtfe3-cpus-projects.vercel.app',
      '*.vercel.app',
    ],
  },
};

export default config;
