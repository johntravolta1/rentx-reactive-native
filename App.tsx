
import "./ignoreWarnings"; //Warning:ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo'
import {useFonts, Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter'
import {ThemeProvider} from 'styled-components'
import theme from './src/styles/theme';
import * as SplashScreen from 'expo-splash-screen';
import { Routes } from './src/routes';
import { AppProvider } from "./src/hooks";


// SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,Inter_500Medium,Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold
  })

  if (fontsLoaded) {
    // SplashScreen.hideAsync();
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>  
        <Routes></Routes>
      </AppProvider>
    </ThemeProvider>
  );
}
