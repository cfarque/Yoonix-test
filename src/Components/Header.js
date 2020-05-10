import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "../logo.png";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 100,
    alignItems: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    diplay: "flex",
    justifyContent: "center",
  },
  title: {
    height: 100,
    width: 250,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <img src={Logo} alt="logo" className={classes.title} />
      </Toolbar>
    </React.Fragment>
  );
};

export default Header;
