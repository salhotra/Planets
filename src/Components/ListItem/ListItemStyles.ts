import { StyleSheet } from 'react-native';

import Colors from "../../Config/Colors";
import { LIST_ITEM_HEIGHT, window } from "../../Config/constants";

const styles = StyleSheet.create({
  container: {
    height: LIST_ITEM_HEIGHT,
    alignItems: "center",
    overflow: "hidden",
    padding: 10,

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
    color: Colors.offWhite,
  },
  solarSystemPositionContainer: {
    height: 80,
    position: "absolute",
    bottom: 0,
    width: window.width,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
});

export default styles;
