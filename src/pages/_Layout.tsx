import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { FunctionComponent } from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { nativeBaseConfig, theme } from "../configs/themes/theme";
import { toastConfig } from "../configs/toast";
import { Navigation } from "../navigation";
import { store } from "../redux/store";

export const Layout: FunctionComponent = () => {
  return (
    <>
      <StatusBar style="auto" animated />

      <NativeBaseProvider theme={theme} config={nativeBaseConfig}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </NativeBaseProvider>

      <Toast config={toastConfig} topOffset={16} />
    </>
  );
};
