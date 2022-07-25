import { Home } from './src/screens/Home';
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo'
import {useFonts, Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter'
import {ThemeProvider} from 'styled-components'
import theme from './src/styles/theme';
import { CarDetails } from './src/screens/CarDetails';
import * as SplashScreen from 'expo-splash-screen';
import { Scheduling } from './src/screens/Scheduling';
import { SchedulingDetails } from './src/screens/SchedulingDetails';
import { ScheduleComplete } from './src/screens/ScheduleComplete';
import { Routes } from './src/routes';


SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,Inter_500Medium,Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold
  })

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes></Routes>
    </ThemeProvider>
  );
}
