import { Badge, Pressable } from "native-base";
import { FunctionComponent, useEffect, useState } from "react";

interface ChipProps {
  text: string;
  isActive: boolean;
  onPress: () => void;
}

export const Chip: FunctionComponent<ChipProps> = ({ isActive, ...props }) => {
  const [active, setActive] = useState(false);

  const handlePressChip = () => {
    props.onPress();
  };

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <Pressable onPressIn={() => setActive(!active)} onPress={handlePressChip}>
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
