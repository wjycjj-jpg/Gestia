import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  fontFamily: 'System',
};

const sharedTheme = {
  roundness: 12,
  version: 3 as const,
};

export const lightTheme = {
  ...MD3LightTheme,
  ...sharedTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1B5E20',
    primaryContainer: '#A5D6A7',
    secondary: '#00695C',
    secondaryContainer: '#B2DFDB',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#D32F2F',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: '#212121',
    onSurface: '#212121',
    onError: '#FFFFFF',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  ...sharedTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#81C784',
    primaryContainer: '#1B5E20',
    secondary: '#80CBC4',
    secondaryContainer: '#00695C',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#EF5350',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onBackground: '#E0E0E0',
    onSurface: '#E0E0E0',
    onError: '#000000',
  },
};
