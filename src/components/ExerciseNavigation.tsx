import Feather from "@expo/vector-icons/Feather";
import { Box, HStack, Text, useTheme } from "native-base";
import { FunctionComponent, useContext } from "react";
import { cancelAnimation, SharedValue, useSharedValue, withTiming } from "react-native-reanimated";
import Tooltip from "react-native-walkthrough-tooltip";
import { WalkthroughContext } from "../redux/walkthrough.context";
import { CustomAnimated } from "./ui/CustomAnimated";

interface ExerciseNavigationProps {
  leftIconDisabled?: boolean;
  rightIconDisabled?: boolean;
  isLastExercise?: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
}

export const ExerciseNavigation: FunctionComponent<ExerciseNavigationProps> = (props) => {
  const theme = useTheme();
  const scaleLeft = useSharedValue(1);
  const scaleRight = useSharedValue(1);
  const { currentTooltip, setCurrentTooltip } = useContext(WalkthroughContext);

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
    <Tooltip
      isVisible={currentTooltip === "exerciseNavigation"}
      content={
        <Box>
          <Text>Navegue entre os exercícios criados ou crie um novo</Text>
        </Box>
      }
      onClose={() => setCurrentTooltip("finished")}
      placement="top"
      topAdjustment={-24}
    >
      <HStack
        justifyContent={"space-around"}
        w={"full"}
        bgColor={currentTooltip === "exerciseNavigation" ? "white:alpha.80" : "transparent"}
        borderRadius={currentTooltip === "exerciseNavigation" ? "2xl" : "none"}
      >
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

        <Box position={"relative"}>
          <CustomAnimated.IconButton
            onPress={handlePressRight}
            rounded={"full"}
            isDisabled={props.rightIconDisabled}
            style={{ transform: [{ scale: scaleRight }] }}
            icon={
              <Feather
                name="corner-up-right"
                size={50}
                color={props.isLastExercise ? theme.colors.green[600] : theme.colors.primary[500]}
              />
            }
            _pressed={{
              backgroundColor: "transparent",
            }}
          />

          {props.isLastExercise && (
            <CustomAnimated.IconButton
              onPress={handlePressRight}
              rounded={"full"}
              isDisabled={props.rightIconDisabled}
              style={{ transform: [{ scale: scaleRight }] }}
              icon={
                <Feather
                  name="plus"
                  size={24}
                  color={props.isLastExercise ? theme.colors.green[600] : theme.colors.primary[500]}
                />
              }
              _pressed={{
                backgroundColor: "transparent",
              }}
              position={"absolute"}
              bottom={"0"}
              right={"-6"}
            />
          )}
        </Box>
      </HStack>
    </Tooltip>
  );
};
