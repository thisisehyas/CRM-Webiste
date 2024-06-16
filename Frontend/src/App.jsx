import React from "react";
import Login from "./routes/Login.jsx";
import SignUp from "./routes/Signup.jsx";
import MyCarousel from "./components/MyCarousel.jsx";
import Carousel from "./components/Admin/Carousel.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        {/* Wanting to add some image for Sprint 3 */}
        <Route path="/" exact>
          <MyCarousel />
        </Route>
        <Route path="/adminpanel">
          <Carousel />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
