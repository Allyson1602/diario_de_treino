import { Text } from "native-base";
import { FunctionComponent } from "react";

interface ITitleProps {
  text: string;
}

export const Title: FunctionComponent<ITitleProps> = (props) => {
  return (
    <Text
      fontSize={"md"}
      fontWeight={"medium"}
      color={"text.700"}
      numberOfLines={1}
    >
      {props.text}
    </Text>
  );
};
