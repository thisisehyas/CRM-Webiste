import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar1 from "./components/Navbar.jsx";
import Footer1 from "./components/Footer.jsx";
import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
import Services from "./routes/Services.jsx";
import SampleWorks from "./routes/Sampleworks.jsx";
import Contact from "./routes/Contact.jsx";
import Login from "./routes/Login.jsx";
import SignIn from "./routes/SignIn.jsx";
import CarouselAdmin from "./components/Admin/AdminCarousel.jsx";
import ServicesAdmin from "./components/Admin/AdminServices.jsx";
import Products from "./routes/Products.jsx";
import { Navbar } from "react-bootstrap";
import EachProduct from "./routes/EachProduct.jsx";
import Category from "./routes/Category.jsx";
import AdminPanel from "./routes/AdminPanel.jsx";

const MainLayout = ({ children }) => (
  <div className="App">
    <Navbar1 />
    <div className="content">{children}</div>
    <Footer1 />
  </div>
);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainLayout>
            <Home />
          </MainLayout>
        </Route>
        <Route path="/About">
          <MainLayout>
            <About />
          </MainLayout>
        </Route>
        <Route path="/Services">
          <MainLayout>
            <Services />
          </MainLayout>
        </Route>
        <Route path="/SampleWorks">
          <MainLayout>
            <SampleWorks />
          </MainLayout>
        </Route>
        <Route path="/Contact">
          <MainLayout>
            <Contact />
          </MainLayout>
        </Route>
        <Route path="/Products">
          <MainLayout>
            <Products />
          </MainLayout>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/testing">
          <CarouselAdmin />
          <ServicesAdmin />
        </Route>
        {/* <Route path="/product/:productName"> */}
        <Route path="/product1">
          <MainLayout>
            <EachProduct />
          </MainLayout>
        </Route>
        <Route path="/category1">
          <MainLayout>
            <Category />
          </MainLayout>
        </Route>
        {/* shouldn't be here. should only be rendered for the admin when they log in. */}
        <Route path="/AdminPanel">
          <AdminPanel />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
