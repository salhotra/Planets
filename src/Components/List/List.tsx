import React, { useRef, useEffect, useState } from "react";
import { Animated, Dimensions, View, StatusBar, Text } from "react-native";

import { PlanetDataType, planets } from "../../Config/planetData";
import { LIST_ITEM_HEIGHT, ANIMATION_CONSTANTS } from "../../Config/constants";
import ListItem from "../ListItem";
import styles from "./ListStyles";

const window = Dimensions.get("window");

interface ListProps {
  data: PlanetDataType;
}

export type ItemPressCallbackType = (
  isOpen: boolean,
  index: number
) => Animated.CompositeAnimation;

const List: React.SFC<ListProps> = ({ data }) => {
  const scrollViewRef = useRef<typeof Animated.ScrollView>(null);

  const [isItemOpen, setIsItemOpen] = useState<boolean>(false);

  const animation = useRef<Animated.AnimatedValue>(new Animated.Value(0))
    .current;

  const handleItemPress: ItemPressCallbackType = (isOpen, index) => {
    setIsItemOpen(isOpen);
    scrollViewRef?.current?.getNode()?.scrollTo({ y: 0 });

    return Animated.timing(animation, {
      toValue: isOpen ? index * -LIST_ITEM_HEIGHT - 80 : 0,
      duration: ANIMATION_CONSTANTS.itemOpenDuration,
    });
  };

  const scrollViewAnimatedStyles = {
    transform: [{ translateY: animation }],
  };

  const containerAnimatedStyles = {
    height: animation.interpolate({
      inputRange: [-900, 0],
      outputRange: [window.height + 900, window.height],
    }),
  };

  useEffect(() => {
    StatusBar.setHidden(true);
  });

  return (
    <Animated.View style={containerAnimatedStyles}>
      <Animated.ScrollView
        style={scrollViewAnimatedStyles}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isItemOpen}
        // @ts-ignore: Type is incorrect in DefinitelyTyped library. Will raise a PR with a fix soon.
        ref={scrollViewRef}
      >
        <View style={styles.header} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Planets</Text>
        </View>
        {data.map((item, index) => {
          return (
            <ListItem
              key={`${index}`}
              planet={item}
              index={index}
              onPressCallback={handleItemPress}
            />
          );
        })}
      </Animated.ScrollView>
    </Animated.View>
  );
};

export default List;
