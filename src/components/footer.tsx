import { makeStyles, Typography } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(3),
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Try on mobile!
      </Typography>
      <Copyright />
    </footer>
  );
}
