// import Navbar from "./navbar";
// import Home from "./home";
import Navbar1 from "./-Navbar1";
import Footer1 from "./-footer1";
import Home from "./-Home";
import About from "./-About";
import Services from "./-Services";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SampleWorks from "./-Sampleworks";
// uncomment the next line again when you want to continure learning and comment the upper line
// import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* code for the blog you are learning */}
        {/* <Navbar />
      <Home /> */}

        {/* the code for the ADSS project */}
        <Navbar1 />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/About">
              <About />
            </Route>
            <Route path="/Services">
              <Services />
            </Route>
            <Route path="/SampleWorks">
              <SampleWorks />
            </Route>
          </Switch>
        </div>
        <Footer1 />
      </div>
    </Router>
  );
}

export default App;
