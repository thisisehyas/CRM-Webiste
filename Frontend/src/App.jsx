import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">{/* <Login /> */}</Route>
          <Route path="/SignIn">{/* <SignIn /> */}</Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
