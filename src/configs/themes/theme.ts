import { LinearGradient } from "expo-linear-gradient";
import { extendTheme } from "native-base";

export const nativeBaseConfig = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export const theme = extendTheme({
  colors: {
    primary: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
    },
    secondary: {
      50: "#F3EDF7",
      100: "#D8CDE5",
      200: "#B99ACF",
      300: "#9967B9",
      400: "#7D429D",
      500: "#602D7F",
      600: "#502469",
      700: "#3E1D5C",
      800: "#2F1446",
      900: "#200C30",
    },
  },
  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins-Thin",
        italic: "Poppins-ThinItalic",
      },
      200: {
        normal: "Poppins-ExtraLight",
        italic: "Poppins-ExtraLightItalic",
      },
      300: {
        normal: "Poppins-Light",
        italic: "Poppins-LightItalic",
      },
      400: {
        normal: "Poppins-Regular",
        italic: "Poppins-Italic",
      },
      500: {
        normal: "Poppins-Medium",
        italic: "Poppins-MediumItalic",
      },
      600: {
        normal: "Poppins-Black",
        italic: "Poppins-BlackItalic",
      },
      700: {
        normal: "Poppins-SemiBold",
        italic: "Poppins-SemiBoldItalic",
      },
      800: {
        normal: "Poppins-Bold",
        italic: "Poppins-BoldItalic",
      },
      900: {
        normal: "Poppins-ExtraBold",
        italic: "Poppins-ExtraBoldItalic",
      },
    },
  },

  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});
