import { Redirect, Route } from "react-router";
import { connect } from "react-redux";
export const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = localStorage.getItem("authToken");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
