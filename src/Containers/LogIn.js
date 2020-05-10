import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const LogIn = ({ setChangeScreen }) => {
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const signIn = async () => {
    try {
      const response = await axios.post("http://localhost:3200/login", {
        email: values.email,
        password: values.password,
      });
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 / 96 });
        Cookies.set("id", response.data.id, { expires: 1 / 96 });
        setChangeScreen(2);
        history.push("/myprotectedpage");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <form
        className={classes.root}
        onSubmit={(e) => {
          e.preventDefault();
          if (values.email && values.password) {
            signIn();
          } else {
            alert("Please complete all fields");
          }
        }}
      >
        <FormControl>
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input
            type="email"
            value={values.email}
            onChange={handleChange("email")}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Log In
        </Button>
        <Button
          color="primary"
          onClick={() => {
            history.push("/signup");
          }}
        >
          No account? Register!
        </Button>
      </form>
    </div>
  );
};

export default LogIn;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: 300,
    height: 500,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: 300,
    width: 250,
  },
}));
