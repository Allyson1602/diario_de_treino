import { FunctionComponent, useState } from "react";
import { Badge, Pressable } from "native-base";

interface ChipProps {
  onPress: () => void;
  text: string;
}

export const Chip: FunctionComponent<ChipProps> = (props) => {
  const [active, setActive] = useState(false);

  const handlePressChip = () => {
    setActive(!active);

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
        }}
      >
        {props.text}
      </Badge>
    </Pressable>
  );
};
