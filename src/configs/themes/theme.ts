import { extendTheme } from "native-base";

export const theme = extendTheme({
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
