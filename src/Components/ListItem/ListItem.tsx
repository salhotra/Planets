import React, { useRef, useState } from "react";
import { Text, Animated, TouchableOpacity } from "react-native";

import PositionInSolarSystem from "../PositionSolarSystem";
import styles from "./ListItemStyles";

import type { PlanetDataItemType } from "../../Config/planetData";
import { ItemPressCallbackType } from "../List/List";
import { LIST_ITEM_HEIGHT, ANIMATION_CONSTANTS, window } from "../../Config/constants";
import Images from "../../Config/Images";

interface ListItemProps {
  index: number;
  planet: PlanetDataItemType;
  onPressCallback: ItemPressCallbackType;
}

const ListItem: React.SFC<ListItemProps> = ({
  planet,
  index,
  onPressCallback,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const heightAnimation = useRef<Animated.Value>(
    new Animated.Value(LIST_ITEM_HEIGHT)
  ).current;
  const planetRotation = useRef<Animated.Value>(new Animated.Value(0)).current;
  const showPlanetDataAnimation = useRef<Animated.Value>(new Animated.Value(0))
    .current;

  const handlePress: () => void = () => {
    setIsOpen(!isOpen);
    const parallelAnimations = [
      Animated.timing(heightAnimation, {
        toValue: isOpen ? LIST_ITEM_HEIGHT : window.height,
        duration: ANIMATION_CONSTANTS.itemOpenDuration,
      }),
      onPressCallback(!isOpen, index),
    ];

    if (isOpen) {
      const closingRotationAnimation = Animated.timing(planetRotation, {
        toValue: 0,
        duration: ANIMATION_CONSTANTS.itemOpenDuration,
      });

      Animated.parallel([
        Animated.timing(showPlanetDataAnimation, {
          toValue: 0,
          duration: 0,
        }),
        ...parallelAnimations,
        closingRotationAnimation,
      ]).start();
    } else {
      Animated.sequence([
        Animated.parallel([
          ...parallelAnimations,
          Animated.timing(planetRotation, {
            toValue: 1,
            duration: ANIMATION_CONSTANTS.planetRotationDuration,
          }),
        ]),
        Animated.timing(showPlanetDataAnimation, {
          toValue: 1,
          duration: ANIMATION_CONSTANTS.planetInfoDisplayDuration,
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
      outputRange: [-8, window.height / 5],
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
      outputRange: [-8, window.height / 5],
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
      outputRange: [0, window.height / 5 + 120 + 25],
    }),
  };

  const planetNameTextStyles = {
    fontSize: heightAnimation.interpolate({
      inputRange: [LIST_ITEM_HEIGHT, window.height],
      outputRange: [20, 25],
    }),
  };

  const planetInfoAnimatedStyles = {
    opacity: showPlanetDataAnimation,
  };

  const planetName = planet.name.toLowerCase();

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <>
        <Animated.Image
          source={planet.background}
          style={styles.backgroundImage}
          resizeMode={"cover"}
        />
        <Animated.View style={[styles.container, animatedStyles]}>
          <Animated.Text
            style={[styles.nickNameText, planetInfoAnimatedStyles]}
          >
            {planet.nickName}
          </Animated.Text>
          <Animated.Image
            source={Images[planetName]}
            style={[
              styles.planet,
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

          <Animated.Text
            style={[
              styles.nameText,
              styles.tagLineText,
              planetInfoAnimatedStyles,
            ]}
          >
            {planet.tagline}
          </Animated.Text>

          <Animated.View
            style={[
              styles.solarSystemPositionContainer,
              planetInfoAnimatedStyles,
            ]}
          >
            <PositionInSolarSystem highlightIndex={index} />

            <Text style={[styles.nameText, styles.bottomText]}>
              1 Year = {planet.lengthOfYear}
            </Text>
          </Animated.View>
        </Animated.View>
      </>
    </TouchableOpacity>
  );
};

export default ListItem;
