import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Box, Link } from "@material-ui/core";
import SimpleDialog from "./Dialog";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/Action/UserActions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    padding: "6px",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  // const { isLoggedIn } = props;
  // const [combinedSate, setcombinedSate] = useState({
  //   isLoginOpen: false,
  //   isRegisterOpen: false,
  // });
  // const loginHandler = (event) => {
  //   setcombinedSate({ ...combinedSate, isLoginOpen: true });
  // };
  // const registerHandler = (event) => {
  //   setcombinedSate({ ...combinedSate, isRegisterOpen: true });
  // };
  // const onClose = () => {
  //   setcombinedSate({
  //     ...combinedSate,
  //     isLoginOpen: false,
  //     isRegisterOpen: false,
  //   });
  // };
  const history = useHistory();
  const { isLoggedIn } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Employee system
          </Typography>
          {/* <Button color="inherit" onClick={loginHandler}>
            Login
          </Button>
          <Button color="inherit" onClick={registerHandler}>
            Register
          </Button> */}
          {!isLoggedIn && (
            <Link
              className="mx-3"
              component="button"
              variant="button"
              color="secondary"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Link>
          )}

          <Link
            component="button"
            className="mx-"
            variant="button"
            color="secondary"
            onClick={() => {
              history.push("/users");
            }}
          >
            Users
          </Link>
          {!isLoggedIn && (
            <Link
              className="mx-"
              component="button"
              variant="button"
              color="secondary"
              onClick={() => {
                history.push("/register");
              }}
            >
              Register
            </Link>
          )}
          {isLoggedIn && (
            <Link
              className="mx-"
              component="button"
              variant="button"
              color="secondary"
              onClick={() => {
                history.push("/add");
              }}
            >
              Add Employee
            </Link>
          )}
          {isLoggedIn && (
            <Button
              variant="contained"
              className={`mx-3 ${classes.btn}`}
              color="secondary"
              onClick={async () => {
                await props.logout();
                history.push("/register");
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {/* {combinedSate.isLoginOpen && (
        <SimpleDialog
          onClose={onClose}
          open={combinedSate.isLoginOpen}
          content={<Login history={history} />}
        />
      )}
      {combinedSate.isRegisterOpen && (
        <SimpleDialog
          onClose={onClose}
          open={combinedSate.isRegisterOpen}
          content={<Register />}
        />
      )} */}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // login,
      // fetchUser,
      logout,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
