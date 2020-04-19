import React, { Fragment } from "react";
import { View } from "react-native";

import { planets } from "../../Config/planetData";
import Colors from "../../Config/Colors";
import styles from "./PositionInSolarSystemStyles";

interface PositionInSolarSystemProps {
  highlightIndex: number;
  itemSize?: number;
  borderColor?: string;
  highlightColor?: string;
}

const PositionInSolarSystem: React.SFC<PositionInSolarSystemProps> = ({
  highlightIndex,
  itemSize = 8,
  borderColor = Colors.lightGrey,
  highlightColor = "white",
}) => {
  const dynamicPlanetStyles = {
    height: itemSize,
    width: itemSize,
    borderRadius: itemSize / 2,
    borderColor: borderColor,
  };

  const sunSize = itemSize * 2;

  const dynamicSunStyles = {
    height: sunSize,
    width: sunSize,
    borderRadius: sunSize / 2,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sun, dynamicSunStyles]} />
      <View style={[styles.joiningLine, {flex: 1.5}]} />
      {planets.map((_, index) => (
          <Fragment key={`position-${index}`}>
            <View
              style={[
                styles.planet,
                dynamicPlanetStyles,
                index === highlightIndex
                  ? { backgroundColor: highlightColor }
                  : {},
              ]}
            />
            {index < planets.length - 1 ? <View style={styles.joiningLine} /> : null}
          </Fragment>
      ))}
    </View>
  );
};

export default PositionInSolarSystem;
