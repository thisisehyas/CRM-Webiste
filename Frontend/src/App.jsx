// // import Navbar from "./navbar";
// // import Home from "./home";
// import Navbar1 from "./-Navbar1";
// import Footer1 from "./-footer1";
// import Home from "./-Home";
// import About from "./-About";
// import Services from "./-Services";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import SampleWorks from "./-Sampleworks";
// import Contact from "./-Contact";
// import Login from "./-Login";
// // uncomment the next line again when you want to continure learning and comment the upper line
// // import './index.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* code for the blog you are learning */}
//         {/* <Navbar />
//       <Home /> */}

//         {/* the code for the ADSS project */}
//         <Navbar1 />
//         <div className="content">
//           <Switch>
//             <Route exact path="/">
//               <Home />
//             </Route>
//             <Route path="/About">
//               <About />
//             </Route>
//             <Route path="/Services">
//               <Services />
//             </Route>
//             <Route path="/SampleWorks">
//               <SampleWorks />
//             </Route>
//             <Route path="/Contact">
//               <Contact />
//             </Route>
//           </Switch>
//         </div>
//         <Footer1 />
//       </div>
//       <div className="login">
//         <Switch>
//           <Route path="/login">
//             <Login />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar1 from "./components/-Navbar1.jsx";
import Footer1 from "./components/-footer1.jsx";
import Home from "./routes/-Home.jsx";
import About from "./routes/-About.jsx";
import Services from "./routes/-Services.jsx";
import SampleWorks from "./routes/-Sampleworks.jsx";
import Contact from "./routes/-Contact.jsx";
import Login from "./routes/-Login.jsx";
import SignIn from "./routes/-SignIn.jsx";

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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
