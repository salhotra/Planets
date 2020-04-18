import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";

import { planets } from "../planetData";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  planet: {
    borderWidth: 1,
  },
  sun: {
    backgroundColor: "orange",
  },
  joiningLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e1e1',
  }
});

const HighlightedIndex = ({
  highlightIndex,
  itemSize = 8,
  borderColor = "#e1e1e1",
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

export default HighlightedIndex;
