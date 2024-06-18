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
import SignUp from "./routes/Signup.jsx";
import CarouselAdmin from "./components/Admin/AdminCarousel.jsx";
import ServicesAdmin from "./components/Admin/AdminServices.jsx";
import Products from "./routes/Products.jsx";
import { Navbar } from "react-bootstrap";
import EachProduct from "./routes/EachProduct.jsx";
import Category from "./routes/Category.jsx";
import AdminPanel from "./routes/AdminPanel.jsx";
import AdminHome from "./components/Admin/RoutesAdmin/AdminHome.jsx";
import AdminProducts from "./components/Admin/RoutesAdmin/AdminProducts.jsx";
import AdminCategory from "./components/Admin/RoutesAdmin/AdminCategory.jsx";
import AdminProduct from "./components/Admin/RoutesAdmin/AdminProduct.jsx";
import CostumerPanel from "./routes/CostumerPanel.jsx";

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
        <Route path="/about">
          <MainLayout>
            <About />
          </MainLayout>
        </Route>
        <Route path="/services">
          <MainLayout>
            <Services />
          </MainLayout>
        </Route>
        <Route path="/sampleWorks">
          <MainLayout>
            <SampleWorks />
          </MainLayout>
        </Route>
        <Route path="/contact">
          <MainLayout>
            <Contact />
          </MainLayout>
        </Route>
        <Route path="/products">
          <MainLayout>
            <Products />
          </MainLayout>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/testing">
          <CarouselAdmin />
          <ServicesAdmin />
        </Route>
        <Route path="/product1">
          <MainLayout>
            <EachProduct />
          </MainLayout>
        </Route>
        <Route path="/adminPanel">
          <AdminPanel />
        </Route>
        <Route path="/adminHome">
          <MainLayout>
            <AdminHome />
          </MainLayout>
        </Route>
        <Route path="/category/:id">
          <MainLayout>
            <Category />
          </MainLayout>
        </Route>
        <Route path="/adminProducts">
          <MainLayout>
            <AdminProducts />
          </MainLayout>
        </Route>
        <Route path="/adminCategory/:id">
          <MainLayout>
            <AdminCategory />
          </MainLayout>
        </Route>
        <Route path="/product/:id">
          <MainLayout>
            <EachProduct />
          </MainLayout>
        </Route>
        <Route path="/adminproduct/:id">
          <MainLayout>
            <AdminProduct />
          </MainLayout>
        </Route>
        <Route path="/costumerpanel">
          <CostumerPanel />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
