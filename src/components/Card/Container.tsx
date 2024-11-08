import { Pressable as PressableNB } from "native-base";
import { FunctionComponent, PropsWithChildren } from "react";
import { CustomAnimated } from "../ui/CustomAnimated";
import { cancelAnimation, useSharedValue, withTiming } from "react-native-reanimated";

interface IContainerProps {
  onPress: () => void;
}

export const Container: FunctionComponent<PropsWithChildren<IContainerProps>> = (props) => {
  const scale = useSharedValue(1);

  const defineAnimationOnPress = () => {
    cancelAnimation(scale);

    scale.value = withTiming(0.98, { duration: 100 }, () => {
      scale.value = withTiming(1, { duration: 100 });
    });
  };

  const handlePress = () => {
    defineAnimationOnPress();

    props.onPress?.();
  };

  return (
    <CustomAnimated.Pressable
      onPress={handlePress}
      borderRadius={8}
      shadow={"3"}
      background={"white"}
      justifyContent={"space-between"}
      p={"2"}
      display={"flex"}
      flexDirection={"row"}
      style={{ transform: [{ scale }] }}
    >
      {props.children}
    </CustomAnimated.Pressable>
  );
};
