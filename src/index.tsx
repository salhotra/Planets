import React from "react";

import List from "./Components/List";
import { planets } from "./Config/planetData";

const App = () => {
  return <List data={planets} />;
};

export default App;
