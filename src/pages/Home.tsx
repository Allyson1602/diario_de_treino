import { Box } from "native-base";
import { FunctionComponent } from "react";
import { Card } from "../components/Card";

export const Home: FunctionComponent = () => {
  return (
    <Box safeArea>
      <Card
        title="Poder Total"
        count={8}
        // date={new Date()}
        onRemove={() => {}}
        muscles={["tríceps", "peito", "ombro"]}
      />
    </Box>
  );
};
