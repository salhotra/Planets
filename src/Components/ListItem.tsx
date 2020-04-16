import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import Images from "../Images";
import { LIST_ITEM_HEIGHT } from "../constants";

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: LIST_ITEM_HEIGHT,
    alignItems: "center",
    overflow: "hidden",
  },
  planet: {
    height: 120,
    width: 120,
    position: "absolute",
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
    color: "white",
  },
});

const ListItem = ({ planet, index, onPressCallback }) => {
  const [isOpen, setIsOpen] = useState(false);

  const heightAnimation = useRef(new Animated.Value(LIST_ITEM_HEIGHT)).current;
  const planetAnimation = useRef(new Animated.ValueXY({ x: -30, y: -8 }))
    .current;
  const planetRotation = useRef(new Animated.Value(0)).current;

  const handlePress = async () => {
    setIsOpen(!isOpen);
    const parallelAnimations = [
      Animated.timing(heightAnimation, {
        toValue: isOpen ? LIST_ITEM_HEIGHT : window.height,
        duration: 280,
      }),
      onPressCallback(!isOpen, index),
      Animated.timing(planetAnimation, {
        toValue: isOpen
          ? { x: -30, y: -8 }
          : { x: window.width / 2 - 60, y: window.height / 2 - 60 },
        duration: 280,
      }),
    ];

    if (isOpen) {
      const closingRotationAnimation = Animated.timing(planetRotation, {
        toValue: 0,
        duration: 280,
      });

      Animated.parallel([
        ...parallelAnimations,
        closingRotationAnimation
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
    left: planetAnimation.x,
    top: planetAnimation.y,
  };

  const planetNameStyles = {
    right: planetAnimation.x.interpolate({
      inputRange: [-30, window.width / 2 - 60],
      outputRange: [0, window.width / 2 - 60],
    }),
    top: planetAnimation.y.interpolate({
      inputRange: [-8, window.height / 2 - 60],
      outputRange: [0, window.height / 2 - 60],
    }),
  };

  const planetWithRingAnimatedStyles = {
    left: planetAnimation.x.interpolate({
      inputRange: [-30, window.width / 2 - 60],
      outputRange: [-70, window.width / 2 - 100],
    }),
    top: planetAnimation.y,
  };

  const planetRotationAnimatedStyles = {
    transform: [
      {
        rotate: planetRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '60deg'],
        })
      }
    ]
  }

  const planetWithRingRotationAnimatedStyles = {
    transform: [
      {
        rotate: planetRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        })
      }
    ]
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: planet.backgroundColor },
          animatedStyles,
        ]}
      >
        <Animated.Image
          source={Images[planet.name.toLowerCase()] || Images.mercury}
          style={[
            styles.planet,
            { backgroundColor: planet.backgroundColor },
            planet.name === "Neptune"
              ? { width: 200, ...planetWithRingAnimatedStyles, ...planetWithRingRotationAnimatedStyles }
              : { ...planetAnimationStyles, ...planetRotationAnimatedStyles },
          ]}
          resizeMode={"contain"}
        />
        <Animated.View style={[styles.name, planetNameStyles]}>
          <Text style={styles.nameText}>{planet.name}</Text>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ListItem;
