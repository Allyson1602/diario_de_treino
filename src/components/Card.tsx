import moment, { Moment } from "moment";
import {
  Badge,
  HStack,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import TrashSimple from "phosphor-react-native/src/icons/TrashSimple";
import React, { FunctionComponent } from "react";

export interface CardProps {
  title: string;
  count: number;
  muscles: string[];
  date?: Date | Moment;
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
        <HStack justifyContent={"space-between"} space={"4"}>
          <HStack space={"2"} alignItems={"center"} flex={1}>
            <Text
              fontSize={"md"}
              fontWeight={"medium"}
              color={"text.700"}
              numberOfLines={1}
            >
              {props.title}
            </Text>
            <Badge
              variant={"outline"}
              rounded={"md"}
              px={"1"}
              h={"5"}
              borderRadius={"sm"}
              borderColor={"gray.300"}
              _text={{
                color: "gray.300",
              }}
            >
              {props.count}
            </Badge>
          </HStack>

          {props.date && (
            <Text fontSize={"xs"} color={"text.400"} backgroundColor={"#ff0"}>
              {moment(props.date).fromNow()}
            </Text>
          )}
        </HStack>

        <ScrollView
          horizontal
          contentContainerStyle={{
            gap: 4,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {props.muscles.map((muscleItem) => (
            <Badge
              rounded={"md"}
              key={muscleItem}
              _text={{
                fontSize: "xs",
                color: "text.800",
              }}
              backgroundColor={"gray.300"}
            >
              {muscleItem}
            </Badge>
          ))}
        </ScrollView>
      </VStack>

      {props.onRemove && (
        <IconButton
          onPress={props.onRemove}
          icon={<Icon as={<TrashSimple size={27} />} color={"error.600"} />}
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
