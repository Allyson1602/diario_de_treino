import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
  "`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.",
  "`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.",
]);
