import { Badge, ScrollView } from "native-base";
import { FunctionComponent } from "react";

interface IMuscleChipsProps {
  muscleNames: string[];
}

export const MuscleChips: FunctionComponent<IMuscleChipsProps> = (props) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        gap: 4,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {props.muscleNames.map((muscleName) => (
        <Badge
          key={muscleName}
          rounded={"md"}
          _text={{
            fontSize: "xs",
            color: "text.800",
          }}
          backgroundColor={"gray.300"}
        >
          {muscleName}
        </Badge>
      ))}
    </ScrollView>
  );
};
