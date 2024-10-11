import { Badge, Pressable } from "native-base";
import { FunctionComponent } from "react";

interface ChipProps {
  text: string;
  active: boolean;
  onPress: () => void;
}

export const Chip: FunctionComponent<ChipProps> = ({
  active = false,
  ...props
}) => {
  const handlePressChip = () => {
    props.onPress();
  };

  return (
    <Pressable onPress={handlePressChip}>
      <Badge
        borderColor={"white"}
        variant={active ? "outline" : "solid"}
        bgColor={active ? "white" : "transparent"}
        _text={{
          color: active ? "lightBlue.600" : "white",
          fontSize: "sm",
        }}
      >
        {props.text}
      </Badge>
    </Pressable>
  );
};
