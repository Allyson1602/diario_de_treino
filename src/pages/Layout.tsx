import { NativeBaseProvider } from "native-base";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import { theme } from "../configs/themes/theme";
import AppLoading from "expo-app-loading";
import { fetchPoppinsFonts } from "../configs/fonts/poppins";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchPoppinsFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.warn(error)}
      />
    );
  }

  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
};
