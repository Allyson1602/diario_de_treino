import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { FunctionComponent, useState } from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { nativeBaseConfig, theme } from "../configs/themes/theme";
import { toastConfig } from "../configs/toast";
import { Navigation } from "../navigation";
import { store } from "../redux/store";
import { WalkthroughContext, WalkthroughValueType } from "../redux/walkthrough.context";

export const Layout: FunctionComponent = () => {
  const [currentTooltip, setCurrentTooltip] = useState<WalkthroughValueType>("");

  return (
    <>
      <StatusBar style="dark" animated translucent />

      <NativeBaseProvider theme={theme} config={nativeBaseConfig}>
        <Provider store={store}>
          <WalkthroughContext.Provider
            value={{
              currentTooltip,
              setCurrentTooltip,
            }}
          >
            <Navigation />
          </WalkthroughContext.Provider>
        </Provider>
      </NativeBaseProvider>

      <Toast config={toastConfig} topOffset={16} />
    </>
  );
};
