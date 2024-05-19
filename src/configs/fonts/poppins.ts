import { loadAsync } from "expo-font";

export const fetchPoppinsFonts = () => {
  return loadAsync({
    "Poppins-Thin": require("../../../assets/fonts/poppins/Poppins-Thin.ttf"),
    "Poppins-ThinItalic": require("../../../assets/fonts/poppins/Poppins-ThinItalic.ttf"),
    "Poppins-ExtraLight": require("../../../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraLightItalic": require("../../../assets/fonts/poppins/Poppins-ExtraLightItalic.ttf"),
    "Poppins-Light": require("../../../assets/fonts/poppins/Poppins-Light.ttf"),
    "Poppins-LightItalic": require("../../../assets/fonts/poppins/Poppins-LightItalic.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-Italic": require("../../../assets/fonts/poppins/Poppins-Italic.ttf"),
    "Poppins-Medium": require("../../../assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-MediumItalic": require("../../../assets/fonts/poppins/Poppins-MediumItalic.ttf"),
    "Poppins-Black": require("../../../assets/fonts/poppins/Poppins-Black.ttf"),
    "Poppins-BlackItalic": require("../../../assets/fonts/poppins/Poppins-BlackItalic.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/poppins/Poppins-SemiBold.ttf"),
    "Poppins-SemiBoldItalic": require("../../../assets/fonts/poppins/Poppins-SemiBoldItalic.ttf"),
    "Poppins-Bold": require("../../../assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-BoldItalic": require("../../../assets/fonts/poppins/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBold": require("../../../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraBoldItalic": require("../../../assets/fonts/poppins/Poppins-ExtraBoldItalic.ttf"),
  });
};
