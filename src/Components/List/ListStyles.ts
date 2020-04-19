import { StyleSheet } from "react-native";

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

export default styles;
