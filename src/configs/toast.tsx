import {
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastConfig,
} from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderRadius: 100,
        borderLeftWidth: 0,
        backgroundColor: "#10b981",
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: "500",
        color: "#fff",
      }}
      text2Style={{
        fontSize: 14,
        color: "#fff",
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderRadius: 100,
        borderLeftWidth: 0,
        backgroundColor: "#f43f5e",
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
      }}
      text2Style={{
        fontSize: 14,
        color: "#fff",
      }}
    />
  ),

  info: (props) => (
    <InfoToast
      {...props}
      style={{
        borderRadius: 100,
        borderLeftWidth: 0,
        backgroundColor: "#0ea5e9",
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "500",
        color: "#fff",
      }}
      text2Style={{
        fontSize: 14,
        color: "#fff",
      }}
    />
  ),
};
