import User from "../User/User";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import UserList from "../User/UserList";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AllUsers from "../User/AllUsers";
const Main = (props) => {
  const history = useHistory();
  const { isLoggedIn, editEmp } = props;
  return (
    <Switch>
      <Route path="/" exact="/">
        {/* {isLoggedIn ? <Redirect to="/users" /> : <Redirect to="/login" />} */}
        <Redirect to="/users" />
      </Route>
      {!isLoggedIn && (
        <Route path="/login">
          <Login history={history} />
        </Route>
      )}
      {!isLoggedIn && (
        <Route path="/register">
          <Register />
        </Route>
      )}
      <Route path="/users" component={AllUsers} />
      {/* {isLoggedIn && <UserList />} */}
      {/* {!isLoggedIn && <div>You are not authenticated....</div>} */}
      {/* <Route path="/add">{isLoggedIn && <User editEmpData={editEmp} />}</Route> */}
    </Switch>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    editEmp: state.employee.editEmp,
  };
};

export default connect(mapStateToProps, null)(Main);
