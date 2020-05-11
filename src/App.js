import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";

import SignUp from "./Containers/SignUp";
import LogIn from "./Containers/LogIn";
import UserPage from "./Containers/UserPage";
import Header from "./Components/Header";

function App() {
  const cookieToken = Cookies.get("token");
  const [token, setToken] = useState(cookieToken || null);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        {token && (
          <Route path="/myprotectedpage">
            <UserPage setToken={setToken} />
          </Route>
        )}
        <Route path="/">
          <LogIn setToken={setToken} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
