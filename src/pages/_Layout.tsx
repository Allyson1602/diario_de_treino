import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { fetchPoppinsFonts } from "../configs/fonts/poppins";
import { nativeBaseConfig, theme } from "../configs/themes/theme";
import { toastConfig } from "../configs/toast";
import { store } from "../redux/store";
import { Home } from "./Home";
import { Training } from "./Training";
import { Workout } from "./Workout";

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Training: undefined;
  Workout: undefined;
}

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator<RootStackParamList>();

export const Layout: FunctionComponent = () => {
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
        <Provider store={store}>
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
        </Provider>
      </NativeBaseProvider>

      <Toast config={toastConfig} topOffset={16} />
    </>
  );
};
