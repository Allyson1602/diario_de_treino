import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import Toast from "react-native-toast-message";
import { fetchPoppinsFonts } from "../configs/fonts/poppins";
import { nativeBaseConfig, theme } from "../configs/themes/theme";
import { toastConfig } from "../configs/toast";
import { Home } from "./Home";
import { Training } from "./Training";
import { Workout } from "./Workout";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await fetchPoppinsFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" animated />

      <NativeBaseProvider theme={theme} config={nativeBaseConfig}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Training" component={Training} />
            <Stack.Screen name="Workout" component={Workout} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>

      <Toast config={toastConfig} topOffset={16} />
    </>
  );
};
