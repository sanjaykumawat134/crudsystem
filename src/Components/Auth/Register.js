import { CircularProgress, emphasize, Icon, Paper } from "@material-ui/core";
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
import { failed, reset } from "../../store/Action/UiActions";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { register } from "../../store/Action/UserActions";
import * as Yup from "yup";
const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,

    // width: "600px",]
    display: "flex",
    justifyContent: "center",
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
const Register = (props) => {
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
  console.log("props=>", props);
  const classes = useStyles();
  const customOnChange = (event) => {
    console.log("==>", event);
    props.reset();
    handleChange(event);
  };
  return (
    <Paper className={classes.root}>
      <div
        className="flex-col sm:flex-row justify-center m-5 p-5"
        // style={{ width: "600px" }}
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
              <Icon style={{ fontSize: "6rem" }}>person_add</Icon>
            </Box>
          }
          <form
            onSubmit={handleSubmit}
            // style={{ width: "600px", margin: "auto" }}
          >
            <div className="flex-col sm:flex-row m-5 ">
              <TextField
                type="text"
                id="name"
                label="name"
                variant="outlined"
                fullWidth
                required
                name="name"
                error={touched.name && !!errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                helperText={touched.name && !!errors.name && errors.name}
              />
            </div>
            <div className="flex-col sm:flex-row m-5 ">
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                fullWidth
                required
                name="email"
                error={touched.email && !!errors.email}
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
            <div className="flex-col sm:flex-row m-5">
              {isSubmitting && (
                <div className=" flex flex-row w-full justify-center items-center">
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
            <div className="flex justify-center m-2 ">
              <ButtonGroup className={`m-1`}>
                <Button
                  color="primary"
                  className={`${classes.button}`}
                  variant="contained"
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  register
                </Button>
                <Button
                  color="secondary"
                  className={`${classes.button}`}
                  variant="contained"
                  type="reset"
                  onClick={() => {}}
                >
                  reset
                </Button>
              </ButtonGroup>
            </div>
          </form>
        </div>
      </div>
    </Paper>
  );
};
const EnhancedRegisterForm = withFormik({
  mapPropsToValues: (props) => ({
    name: "",
    email: "",
    password: "",
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required("name is required"),
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
      const res = await props.register(values);
      setSubmitting(false);
      if (res === 201) {
        props.history.push("/users");
      } else {
        // props.history.push("/login");
      }
    } catch (error) {
      console.log("error", error);
      // props.failed(error.message);
    }
  },
  displayName: "Login",
})(Register);
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    msg: state.ui.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      register,
      // failed,
      reset,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedRegisterForm);
