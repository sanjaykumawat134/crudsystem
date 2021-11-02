import React from "react";
// import "./index.css";
import "./App.css";
import Header from "./Components/UI/Header";
import Footer from "./Components/UI/Footer";
import Main from "./Components/UI/Main";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Main />

        {/* <Footer /> */}
      </Router>
    </React.Fragment>
  );
}

export default App;
