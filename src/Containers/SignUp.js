import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
    showPassword: false,
  });
  const [checkPassword, setCheckPassword] = useState({
    password: "",
    showPassword: false,
  });

  const submitInformations = async () => {
    try {
      if (checkPassword.password === values.password) {
        await axios.post("http://localhost:3200/signup", {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        alert(
          "Your registration is complete, please enter your credentials to connect"
        );
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeCheckPassword = (prop) => (event) => {
    setCheckPassword({ ...checkPassword, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowCheckPassword = () => {
    setCheckPassword({
      ...checkPassword,
      showPassword: !checkPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form
      className={classes.root}
      onSubmit={(e) => {
        e.preventDefault();
        if (values.email && values.password && checkPassword.password) {
          submitInformations();
        } else {
          alert("Please complete all fields");
        }
      }}
    >
      <FormControl>
        <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
        <Input
          pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
          value={values.email}
          onChange={handleChange("email")}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="standard-adornment-password">Username</InputLabel>
        <Input value={values.username} onChange={handleChange("username")} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])"
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
        <span className={classes.passwordContain}>
          Contain 1 num, 1 upperCase, 1 lowerCase, 1 special character
        </span>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="standard-adornment-password">
          Password confirmation
        </InputLabel>
        <Input
          type={checkPassword.showPassword ? "text" : "password"}
          value={checkPassword.password}
          onChange={handleChangeCheckPassword("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowCheckPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {checkPassword.showPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
      <Button
        color="primary"
        onClick={() => {
          history.push("/login");
        }}
      >
        Already registered? Go to login!
      </Button>
    </form>
  );
};

export default SignUp;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 600,
    width: 450,
  },
  passwordContain: {
    fontSize: 12,
    color: "lightGrey",
  },
}));
