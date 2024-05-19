import moment from "moment";
import {
  Badge,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
  VStack,
} from "native-base";
import TrashSimple from "phosphor-react-native/src/icons/TrashSimple";
import React, { FunctionComponent } from "react";

export interface CardProps {
  title: string;
  count: number;
  muscles: string[];
  date?: Date;
  onRemove?: () => void;
}

export const Card: FunctionComponent<CardProps> = (props) => {
  return (
    <Pressable
      borderRadius={8}
      shadow={"3"}
      background={"white"}
      justifyContent={"space-between"}
      p={"2"}
      display={"flex"}
      flexDirection={"row"}
    >
      <VStack flexGrow={1} space={"4"}>
        <HStack justifyContent={"space-between"}>
          <HStack space={"2"}>
            <Text
              fontSize={"xl"}
              fontWeight={"medium"}
              color={"text.700"}
              numberOfLines={1}
            >
              {props.title}
            </Text>
            <Badge variant={"outline"} rounded={"md"}>
              {props.count}
            </Badge>
          </HStack>

          {props.date && <Text>{moment(props.date).fromNow()}</Text>}
        </HStack>

        <HStack space={"1"}>
          {props.muscles.map((muscleItem) => (
            <Badge
              rounded={"md"}
              key={muscleItem}
              _text={{
                fontSize: "md",
                color: "text.800",
              }}
              backgroundColor={"gray.300"}
            >
              {muscleItem}
            </Badge>
          ))}
        </HStack>
      </VStack>

      {props.onRemove && (
        <IconButton
          onPress={props.onRemove}
          icon={<Icon as={<TrashSimple size={33} />} color={"error.600"} />}
          alignSelf={"center"}
          rounded={"full"}
          _pressed={{
            backgroundColor: "error.100",
          }}
        />
      )}
    </Pressable>
  );
};
