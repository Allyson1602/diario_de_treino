import moment, { Moment } from "moment";
import { Text } from "native-base";
import { FunctionComponent } from "react";

interface ILastTrainingDateProps {
  lastTraining?: Moment;
}

export const LastTrainingDate: FunctionComponent<ILastTrainingDateProps> = (
  props
) => {
  if (!props.lastTraining) return <></>;

  return (
    <Text fontSize={"xs"} color={"text.400"} backgroundColor={"#ff0"}>
      {moment(props.lastTraining).fromNow()}
    </Text>
  );
};
