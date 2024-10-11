import { Icon, IconButton, Tooltip } from "native-base";
import { FunctionComponent, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

interface ITrashButtonIconProps {
  onRemove?: () => void;
}

const AnimatedIconButton = Animated.createAnimatedComponent(IconButton);

export const TrashButtonIcon: FunctionComponent<ITrashButtonIconProps> = (props) => {
  if (!props.onRemove) return <></>;

  const scale = useSharedValue(1);

  const [isToolTipOpen, setIsToolTipOpen] = useState(false);

  const defineAnimationOnPressRemove = () => {
    scale.value = withTiming(0.9, { duration: 200 }, () => {
      scale.value = withTiming(1, { duration: 200 });
    });
  };

  const closeToolTip = () => {
    setTimeout(() => {
      setIsToolTipOpen(false);
    }, 5000);
  };

  const openToolTip = () => {
    setIsToolTipOpen(true);
    closeToolTip();
  };

  const handlePressRemove = () => {
    defineAnimationOnPressRemove();

    if (isToolTipOpen) {
      props.onRemove?.();
      setIsToolTipOpen(false);
      return;
    }

    openToolTip();
  };

  return (
    <Tooltip
      label="Clique novamente para excluir"
      isOpen={isToolTipOpen}
      placement="bottom left"
      right={"2"}
      top={"-36"}
      bgColor={"danger.600"}
    >
      <AnimatedIconButton
        onPress={handlePressRemove}
        icon={<Icon as={Feather} name="trash" size={27} color={"red.600"} />}
        alignSelf={"center"}
        rounded={"full"}
        variant={"unstyled"}
        style={{
          transform: [{ scale: scale }],
        }}
      />
    </Tooltip>
  );
};
