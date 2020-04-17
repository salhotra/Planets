import React, { useRef, useEffect, useState, createRef } from "react";
import {
  Animated,
  Dimensions,
  View,
  StatusBar,
  Text,
  StyleSheet,
} from "react-native";

import ListItem from "./ListItem";
import { LIST_ITEM_HEIGHT } from "../constants";

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: "black",
  },
  headerTextContainer: {
    zIndex: 1000,
    elevation: 1000,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 70,
  },
  headerText: {
    color: "white",
    fontSize: 26,
    marginTop: 20,
  },
});

const scrollViewRef: React.Ref<any> = createRef();

const List = ({ data }) => {
  const [isItemOpen, setIsItemOpen] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;

  const handleItemPress = (isOpen, index) => {
    setIsItemOpen(isOpen);
    scrollViewRef?.current?.getNode()?.scrollTo({ y: 0 });
    return Animated.timing(animation, {
      toValue: isOpen ? index * -LIST_ITEM_HEIGHT - 80 : 0,
      duration: 350,
    });
  };

  const animatedStyles = {
    transform: [{ translateY: animation }],
  };

  const viewStyles = {
    height: animation.interpolate({
      inputRange: [-900, 0],
      outputRange: [window.height + 900, window.height],
    }),
  };

  useEffect(() => {
    StatusBar.setHidden(true);
  });

  return (
    <Animated.View style={viewStyles}>
      <Animated.ScrollView
        style={[animatedStyles]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isItemOpen}
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
