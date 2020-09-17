import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import TemporaryDrawer from "./drawer";
import { showNsfwProps } from "../commonProps";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "nowrap",
      marginBottom: "2em",
    },
    goofyFont: {
      fontFamily: "Rancho",
      marginLeft: "2em",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

export interface HeaderProps extends showNsfwProps {};

function Header({showNsfw, setShowNsfw }: HeaderProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <TemporaryDrawer showNsfw={showNsfw} setShowNsfw={setShowNsfw}/>
          <h1 className={classes.goofyFont}>G o O f Y</h1>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
