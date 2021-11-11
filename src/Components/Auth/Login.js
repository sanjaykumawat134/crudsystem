import {
  Box,
  CircularProgress,
  emphasize,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ButtonGroup } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { withFormik, yupToFormErrors } from "formik";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { login } from "../../store/Action/UserActions";
import { login } from "../../store/Action/UserActions";
import { failed, reset } from "../../store/Action/UiActions";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Icon } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // width: "600px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    margin: "5px",
    // padding: "5px",
  },
  // btnGroup: {
  //   bottom: "10px",
  // },
}));
const Login = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    dirty,
    isValid,
    isSubmitting,
  } = props;
  const customOnChange = (event) => {
    props.reset();
    handleChange(event);
  };
  const classes = useStyles();
  console.log("props", props);
  // useEffect(() => {
  //   if (props.isLoggedIn) {
  //     props.history.push("/users");
  //   }
  // }, []);
  return (
    <div className={classes.root}>
      <Paper
        className="flex-col sm:flex-row justify-center m-5 p-5"
        elevation={6}
      >
        <div
          className=""
          style={{
            boxShadow: "3px 3px 10px black",
            padding: "50px",
            margin: "40px auto",
            width: "600px",
            boxSizing: "border-box",
          }}
        >
          {
            <Box
              fontWeightBold
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Icon style={{ fontSize: "6rem" }}>account_circle</Icon>
            </Box>
          }
          <form onSubmit={handleSubmit}>
            <div className="flex-col sm:flex-row m-5 ">
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                fullWidth
                required
                name="email"
                error={touched.email && !!errors.email}
                // onChange={handleChange}
                onChange={customOnChange}
                onBlur={handleBlur}
                value={values.email}
                helperText={touched.email && !!errors.email && errors.email}
              />
            </div>

            <div className="flex-col sm:flex-row m-5">
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                name="password"
                type="password"
                error={touched.password && !!errors.password}
                // onChange={handleChange}
                onChange={customOnChange}
                onBlur={handleBlur}
                value={values.password}
                fullWidth
                required
                helperText={
                  touched.password && !!errors.password && errors.password
                }
              />
            </div>
            <div className="flex-col sm:flex-row ">
              {isSubmitting && (
                <div className="flex flex-row w-full justify-center ">
                  <CircularProgress color="secondary" />
                </div>
              )}
            </div>
            <div className="flex-col sm:flex-row ">
              <div
                className="flex flex-row w-full justify-center "
                style={{ color: "red" }}
              >
                {props.msg}
              </div>
            </div>
            <div className="flex m-2 justify-center">
              <ButtonGroup className={`m-1`}>
                <Button
                  color="primary"
                  className={`${classes.button}`}
                  variant="contained"
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  Login
                </Button>
                <Button
                  color="secondary"
                  className={`${classes.button}`}
                  variant="contained"
                  type="reset"
                  onClick={() => {}}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
};
const EnhancedLoginForm = withFormik({
  mapPropsToValues: (props) => ({
    email: "",
    password: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
        "password must be minimum eight characters, at least one letter, one number and one special character:"
      ),
  }),
  handleSubmit: async (values, { setSubmitting, props }) => {
    try {
      setSubmitting(true);
      const res = await props.login(values);
      setSubmitting(false);
      if (res === 200) {
        alert("successfully logged in ...!");
        props.history.push("/users");
      } else {
        props.history.push("/login");
      }
    } catch (error) {
      // console.log("", error);
      // props.failed("something went wrong ...!");
    }
  },
  displayName: "Login",
})(Login);
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isOpen: state.ui.isOpen,
    msg: state.ui.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login,
      // fetchUser,
      failed,
      reset,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(EnhancedLoginForm);
// export default EnhancedLoginForm;
