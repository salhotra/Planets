import React from "react";
import { ScrollView, Text, StatusBar, SafeAreaView } from "react-native";

import List from "./Components/List";

const planets = [
  { name: "Mercury", color: "orange", backgroundColor: 'violet' },
  { name: "Venus", color: "silver", backgroundColor: 'purple' },
  { name: "Earth", color: "blue", backgroundColor: 'darkblue' },
  { name: "Mars", color: "red", backgroundColor: 'darkred' },
  { name: "Jupitor", color: "teal", backgroundColor: 'lightgreen' },
  { name: "Saturn", color: "yellow", backgroundColor: 'orange' },
  { name: "Uranus", color: "green", backgroundColor: 'blue' },
  { name: "Neptune", color: "lightblue", backgroundColor: 'red' },
];

const App = () => {
  return (
    <List data={planets} />
  );
};

export default App;
