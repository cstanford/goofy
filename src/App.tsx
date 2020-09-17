import React from "react";
import Header from "./components/header";
import Search from "./components/search";
import Footer from "./components/footer";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import "./App.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    site: {
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
    },
    siteContent: {
      flex: 1,
    },
  })
);

function App() {
  const [showNsfw, setShowNsfw] = React.useState(true);
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.site}>
        <Header showNsfw={showNsfw} setShowNsfw={setShowNsfw} />
        <main className={classes.siteContent}>
            <Search showNsfw={showNsfw} setShowNsfw={setShowNsfw} />
        </main>
      </div>
    </div>
  );
}

export default App;
