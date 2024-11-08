import { useFocusEffect } from "@react-navigation/native";
import { Moment } from "moment";
import { Text } from "native-base";
import { FunctionComponent, useCallback, useState } from "react";

interface ILastTrainingDateProps {
  lastTraining?: Moment;
}

export const LastTrainingDate: FunctionComponent<ILastTrainingDateProps> = (props) => {
  const [lastTraining, setLastTraining] = useState("");

  if (!props.lastTraining) return <></>;

  const getDatetimeLastTraining = () => {
    setInterval(() => {
      setLastTraining(props.lastTraining!.fromNow());
    }, 1000);
  };

  useFocusEffect(
    useCallback(() => {
      getDatetimeLastTraining();
    }, []),
  );

  return (
    <Text fontSize={"xs"} color={"text.400"} backgroundColor={"#ff0"}>
      {lastTraining}
    </Text>
  );
};
