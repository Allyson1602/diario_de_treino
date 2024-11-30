import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { FunctionComponent, useState } from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { nativeBaseConfig, theme } from "../configs/themes/theme";
import { toastConfig } from "../configs/toast";
import { Navigation } from "../navigation";
import { WalkthroughContext, WalkthroughValueType } from "../contexts/walkthrough.context";
import { RecoilRoot } from "recoil";

export const Layout: FunctionComponent = () => {
  const [currentTooltip, setCurrentTooltip] = useState<WalkthroughValueType>("");

  return (
    <>
      <StatusBar style="dark" animated translucent />

      <NativeBaseProvider theme={theme} config={nativeBaseConfig}>
        <RecoilRoot>
          <WalkthroughContext.Provider
            value={{
              currentTooltip,
              setCurrentTooltip,
            }}
          >
            <Navigation />
          </WalkthroughContext.Provider>
        </RecoilRoot>
      </NativeBaseProvider>

      <Toast config={toastConfig} topOffset={16} />
    </>
  );
};
