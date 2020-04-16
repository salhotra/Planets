import React, { useRef, useEffect } from "react";
import { Animated, Dimensions, View, StatusBar, Text, StyleSheet } from "react-native";

import ListItem from "./ListItem";
import { LIST_ITEM_HEIGHT } from "../constants";

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: 'black'
  },
  headerTextContainer: {
    zIndex: 1000,
    elevation: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 100
  },
  headerText: {
    color: 'white',
    fontSize: 26,
    marginTop: 20
  }
});

const window = Dimensions.get("window");

const List = ({ data }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const handleItemPress = (isOpen, index) => {
    return Animated.timing(animation, {
      toValue: isOpen ? (index + 1) * -LIST_ITEM_HEIGHT : 0,
      duration: 280
    });
  }

  const animatedStyles = {
    transform: [
      { translateY: animation },
    ],
  }

  const viewStyles = {
    height: animation.interpolate({
      inputRange: [-900, 0],
      outputRange: [window.height + 900, window.height]
    })
  }

  useEffect(() => {
    StatusBar.setHidden(true);
  });

  return (
    <>
      <Animated.View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Planets</Text>
      </Animated.View>
      <Animated.View style={viewStyles}>
        <Animated.ScrollView style={[animatedStyles]}>
          <View style={styles.header} />
          {data.map((item, index) => {
            return <ListItem key={`${index}`} planet={item} index={index} onPressCallback={handleItemPress} />;
          })}
        </Animated.ScrollView>
      </Animated.View>
    </>
  );
};

export default List;
