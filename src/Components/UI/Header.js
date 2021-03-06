import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Box, Icon, Link, Tooltip } from "@material-ui/core";
import SimpleDialog from "./Dialog";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/Action/UserActions";
import { toggleDialog, editEmployee } from "../../store/Action/EmpActions";
import Add from "@material-ui/icons/Add";
import User from "../User/User";

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
  link: {
    color: "white",
    margin: "0 5px",
    textDecoration: "none",
  },
  customIcon: {
    fontSize: "2.2rem",
    color: "white",
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
  const onClose = () => {
    toggleDialog();
  };
  const addUserHandler = () => {
    toggleDialog();
  };
  const history = useHistory();
  const { isLoggedIn, toggleDialog, isDialogOpen, editEmp, editEmployee } =
    props;
  return (
    <AppBar position="static" color={"transparent"}>
      <Toolbar
        // className="bg-blue-500"
        style={{ backgroundColor: "#370000" }}
      >
        {/* <IconButton
          edge="start"
          // className="text-white"
          style={{ color: "white" }}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className={`${classes.title} text-white  `}>
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
            className={`mx-3 ${classes.link}`}
            component="button"
            variant="button"
            onClick={() => {
              history.push("/login");
            }}
          >
            <Tooltip title="Login">
              <Icon className={`${classes.customIcon}`}>login</Icon>
            </Tooltip>
          </Link>
        )}
        {isLoggedIn && (
          <IconButton
            // component="button"
            className={` ${classes.link}`}
            variant="button"
            onClick={() => {
              history.push("/users");
            }}
          >
            <Tooltip title="employees list">
              <Icon className={`${classes.customIcon}`}>people_alt</Icon>
            </Tooltip>
          </IconButton>
        )}
        {!isLoggedIn && (
          <IconButton
            className={` ${classes.link} ${classes.customIcon}`}
            variant="button"
            onClick={() => {
              history.push("/register");
            }}
          >
            <Tooltip title="register">
              <Icon className={`${classes.customIcon}`}> app_registration</Icon>
            </Tooltip>
          </IconButton>
        )}
        {isLoggedIn && (
          <IconButton
            variant="contained"
            className={` ${classes.link} ${classes.customIcon}`}
            color="secondary"
            // onClick={() => {
            //   // history.push("/add");
            // }}

            onClick={addUserHandler}
          >
            <Tooltip title="add employee">
              <Icon className={`${classes.customIcon}`}>group_add</Icon>
            </Tooltip>
          </IconButton>
        )}
        {isLoggedIn && (
          <IconButton
            variant="contained"
            className={` ${classes.link}`}
            // color="secondary"
            onClick={async () => {
              if (window.confirm("Are you sure to log out ?")) {
                await props.logout();
                history.push("/login");
              }
            }}
          >
            <Tooltip title="logout">
              <Icon className={`${classes.customIcon}`}>exit_to_app</Icon>
            </Tooltip>
          </IconButton>
        )}
      </Toolbar>
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
      {isDialogOpen && (
        <SimpleDialog
          onClose={onClose}
          open={isDialogOpen}
          title={`${editEmp !== null ? "Edit" : "Add"} User`}
          content={<User editEmpData={editEmp} editEmployee={editEmployee} />}
        />
      )}
    </AppBar>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isDialogOpen: state.employee.isDialogOpen,
    editEmp: state.employee.editEmp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // login,
      // fetchUser,
      logout,
      toggleDialog,
      editEmployee,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
