import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
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
    marginBottom: 30,
  },
  logo: {
    height: 100,
    width: 300,
    objectFit: "contain",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <img src={Logo} alt="logo" className={classes.logo} />
      </Toolbar>
    </React.Fragment>
  );
};

export default Header;
