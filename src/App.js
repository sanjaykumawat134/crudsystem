import React from "react";
// import "./index.css";
import "./App.css";
import Header from "./Components/UI/Header";
import Footer from "./Components/UI/Footer";
import Main from "./Components/UI/Main";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkLogin } from "./store/Action/UserActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
function App(props) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      setIsLoading(true);
      await props.checkLogin();
      setIsLoading(false);
    };
    checkLogin();
  }, []);
  return (
    <React.Fragment>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Router>
          <Header />
          <Main />

          {/* <Footer /> */}
        </Router>
      )}
    </React.Fragment>
  );
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      checkLogin,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(App);
