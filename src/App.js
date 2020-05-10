import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";

import SignUp from "./Containers/SignUp";
import LogIn from "./Containers/LogIn";
import UserPage from "./Containers/UserPage";
import Header from "./Components/Header";

function App() {
  let token = null;
  const cookieToken = Cookies.get("token");
  const [changeScreen, setChangeScreen] = useState(1);

  if (cookieToken) {
    token = cookieToken;
  } else {
    token = null;
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        {token && (
          <Route path="/myprotectedpage">
            <UserPage setChangeScreen={setChangeScreen} />
          </Route>
        )}
        <Route path="/">
          <LogIn setChangeScreen={setChangeScreen} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
