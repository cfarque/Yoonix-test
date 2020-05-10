import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Loader from "react-loader-spinner";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Logo from "../logo.png";
import Joyce from "../joyce.png";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const UserPage = ({ setChangeScreen }) => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");
    const response = await axios.get(
      `http://localhost:3200/myprotectedpage/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setUser(response.data.user);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={classes.general}>
      {isLoading ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <div className={classes.container}>
          <div className={classes.root}>
            <div className={classes.userInfo}>
              <Avatar className={classes.purple}>
                {user.account.username[0].toUpperCase()}
              </Avatar>
              <div className={classes.user}>
                <div>{user.account.username}</div>
                <div>{user.email}</div>
              </div>
            </div>
          </div>
          <div className={classes.button}>
            <div className={classes.buttonContainer}>
              <div>Bienvenue sur Yoonix ! </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                mattis risus eu imperdiet lacinia
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  Cookies.remove("id");
                  Cookies.remove("token");
                  setChangeScreen(null);
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
          <div className={classes.endContainer}>
            <div>
              <img src={Joyce} alt="joyce" className={classes.picture} />
            </div>
            <div className={classes.thankContainer}>
              Thank you,
              <img src={Logo} alt="logo" className={classes.logoEnd} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;

const useStyles = makeStyles((theme) => ({
  thankContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  endContainer: {
    marginTop: 10,
    display: "flex",
    width: 300,
    justifyContent: "space-between",
  },
  picture: {
    width: 150,
    height: 150,
  },
  logoEnd: {
    width: 100,
    height: 80,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  general: {
    display: "flex",
    justifyContent: "center",
    height: 600,
    width: 1280,
  },
  root: {
    position: "relative",
    top: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "1px 0px 18px 5px  rgba(34, 34, 34, 0.2)",
    borderWidth: 1,
    display: "flex",
    height: 230,
    width: 500,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    backgroundColor: "#EDF5FF",
    width: "100vw",
    height: 450,
    display: "flex",
    justifyContent: "center",
    color: "grey",
    fontSize: 15,
  },
  buttonContainer: {
    width: 300,
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 30,
    textAlign: "center",
    lineHeight: 2,
  },
  userInfo: {
    width: 300,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "80%",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    fontSize: 50,
    width: 75,
    height: 75,
  },
  user: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "80%",
  },
}));
