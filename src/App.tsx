import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Header from "./components/header";
import Search from "./components/search";

import "./App.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      backgroundColor: theme.palette.background.default,
      padding: "5rem",
    },
  })
);

function App() {
  const [showNsfw, setShowNsfw] = React.useState(true);
  return (
    <div className="App">
      <Header showNsfw={showNsfw} setShowNsfw={setShowNsfw}/>
      <Search showNsfw={showNsfw} setShowNsfw={setShowNsfw}/>
    </div>
  );
}

export default App;
