import { StyleSheet } from "react-native";
import Colors from "../../Config/Colors";

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
    backgroundColor: Colors.lightGrey,
  },
});

export default styles;
