import React, { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Images from "../Images";
import { LIST_ITEM_HEIGHT } from "../constants";

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: LIST_ITEM_HEIGHT,
    alignItems: "center",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  planet: {
    height: 120,
    width: 120,
    position: "absolute",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  name: {
    position: "absolute",
    height: 120,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: 20,
    color: "#fefefe",

    shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
});

const ListItem = ({ planet, index, onPressCallback }) => {
  const [isOpen, setIsOpen] = useState(false);

  const heightAnimation = useRef(new Animated.Value(LIST_ITEM_HEIGHT)).current;
  const planetRotation = useRef(new Animated.Value(0)).current;

  const handlePress = async () => {
    setIsOpen(!isOpen);
    const parallelAnimations = [
      Animated.timing(heightAnimation, {
        toValue: isOpen ? LIST_ITEM_HEIGHT : window.height,
        duration: 350,
      }),
      onPressCallback(!isOpen, index),
    ];

    if (isOpen) {
      const closingRotationAnimation = Animated.timing(planetRotation, {
        toValue: 0,
        duration: 350,
      });

      Animated.parallel([
        ...parallelAnimations,
        closingRotationAnimation,
      ]).start();
    } else {
      Animated.sequence([
        Animated.parallel(parallelAnimations),
        Animated.timing(planetRotation, {
          toValue: 1,
          duration: 1500,
        }),
      ]).start();
    }
  };

  const animatedStyles = {
    height: heightAnimation,
    zIndex: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, LIST_ITEM_HEIGHT + 0.1, window.height],
      outputRange: [1, 10, 10],
    }),
  };

  const planetAnimationStyles = {
    left: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [-30, window.width / 2 - 90],
    }),
    top: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [-8, window.height / 3],
    }),
    transform: [
      {
        rotate: planetRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "60deg"],
        }),
      },
    ],
    height: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [120, 180],
    }),
    width: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [120, 180],
    }),
  };

  const planetWithRingAnimatedStyles = {
    left: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [-70, window.width / 2 - 130],
    }),
    top: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [-8, window.height / 3],
    }),
    transform: [
      {
        rotate: planetRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
    height: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [120, 180],
    }),
    width: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [200, 260],
    }),
  };

  const planetNameStyles = {
    right: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [0, window.width / 2 - 60],
    }),
    top: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [0, window.height / 3 + 120 + 20],
    }),
  };

  const planetNameTextStyles = {
    fontSize: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [20, 25],
    }),
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <>
        <Animated.Image
          source={planet.background}
          style={[
            {
              position: "absolute",
              height: window.height,
              width: window.width,
            },
          ]}
          resizeMode={"cover"}
        />
        <Animated.View style={[styles.container, animatedStyles]}>
          <Animated.Image
            source={Images[planet.name.toLowerCase()]}
            style={[
              styles.planet,
              { backgroundColor: planet.backgroundColor },
              planet.hasRing
                ? planetWithRingAnimatedStyles
                : planetAnimationStyles,
            ]}
            resizeMode={"contain"}
          />
          <Animated.View style={[styles.name, planetNameStyles]}>
            <Animated.Text style={[styles.nameText, planetNameTextStyles]}>
              {planet.name}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </>
    </TouchableOpacity>
  );
};

export default ListItem;
