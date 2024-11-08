import Feather from "@expo/vector-icons/Feather";
import { HStack, useTheme } from "native-base";
import { FunctionComponent } from "react";
import { cancelAnimation, SharedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { CustomAnimated } from "./ui/CustomAnimated";

interface ExerciseNavigationProps {
  leftIconDisabled?: boolean;
  rightIconDisabled?: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
}

export const ExerciseNavigation: FunctionComponent<ExerciseNavigationProps> = (props) => {
  const theme = useTheme();
  const scaleLeft = useSharedValue(1);
  const scaleRight = useSharedValue(1);

  const defineAnimationOnPress = (scale: SharedValue<number>) => {
    cancelAnimation(scale);

    scale.value = withTiming(0.8, { duration: 100 }, () => {
      scale.value = withTiming(1, { duration: 100 });
    });
  };

  const handlePressLeft = () => {
    defineAnimationOnPress(scaleLeft);

    props.onPressLeft();
  };

  const handlePressRight = () => {
    defineAnimationOnPress(scaleRight);

    props.onPressRight();
  };

  return (
    <HStack justifyContent={"space-around"} w={"full"}>
      <CustomAnimated.IconButton
        onPress={handlePressLeft}
        rounded={"full"}
        isDisabled={props.leftIconDisabled}
        style={{ transform: [{ scale: scaleLeft }] }}
        icon={<Feather name="corner-up-left" size={50} color={theme.colors.primary[500]} />}
        _pressed={{
          backgroundColor: "transparent",
        }}
      />

      <CustomAnimated.IconButton
        onPress={handlePressRight}
        rounded={"full"}
        isDisabled={props.rightIconDisabled}
        style={{ transform: [{ scale: scaleRight }] }}
        icon={<Feather name="corner-up-right" size={50} color={theme.colors.primary[500]} />}
        _pressed={{
          backgroundColor: "transparent",
        }}
      />
    </HStack>
  );
};
