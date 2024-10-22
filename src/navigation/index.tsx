import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { HeaderTraining } from "../components/HeaderTraining";
import { fetchPoppinsFonts } from "../configs/fonts/poppins";
import { Home } from "../pages/Home";
import { Training } from "../pages/Training";
import { Workout } from "../pages/Workout";
import { HeaderWorkout } from "../components/HeaderWorkout";

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Training: undefined;
  Workout: undefined;
}

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation: FunctionComponent = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

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

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Training"
          component={Training}
          options={{
            header: HeaderTraining,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Workout"
          component={Workout}
          options={{
            header: HeaderWorkout,
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
