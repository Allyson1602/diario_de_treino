import { Box, Pressable } from "native-base";
import Animated from "react-native-reanimated";

export const CustomAnimated = {
  Pressable: Animated.createAnimatedComponent(Pressable),
  Box: Animated.createAnimatedComponent(Box),
};
