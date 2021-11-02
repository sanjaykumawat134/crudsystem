import { CircularProgress, emphasize, Paper } from "@material-ui/core";
import React from "react";
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
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
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
    padding: theme.spacing(0.5),
    margin: theme.spacing(1),
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

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className="flex-col sm:flex-row justify-center m-5 p-5">
        <form
          onSubmit={handleSubmit}
          style={{ width: "600px", margin: "auto" }}
        >
          <div className="flex-col sm:flex-row m-5 ">
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              fullWidth
              required
              name="email"
              error={touched.email && !!errors.email}
              onChange={handleChange}
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
              onChange={handleChange}
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
          <div className="flex m-2 justify-center">
            <ButtonGroup className={`m-1`}>
              <Button
                color="primary"
                className="m-4"
                variant="contained"
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                Login
              </Button>
              <Button
                color="secondary"
                className="m-4"
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
        props.history.push("/users");
      } else {
        props.history.push("/login");
      }
    } catch (error) {
      console.log("", error);
    }
  },
  displayName: "Login",
})(Login);
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login,
      // fetchUser,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(EnhancedLoginForm);
// export default EnhancedLoginForm;
