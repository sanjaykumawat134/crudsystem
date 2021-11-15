import "date-fns";
import Button from "@material-ui/core/Button/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup/ButtonGroup";
import Card from "@material-ui/core/Card/Card";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { addEmployee, toggleDialog } from "../../store/Action/EmpActions";
import { failed, reset } from "../../store/Action/UiActions";
import React from "react";
import * as Yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withFormik } from "formik";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
const useStyles = makeStyles((theme) => ({
  commonUtilities: {
    marginLeft: "1rem",
  },
  formControl: {
    margin: "10px 0",
  },
  commonMargin: {
    margin: "2rem 0",
  },
  card: {
    width: "600px",
    margin: "20px",
  },

  role: {
    color: "#EF4444",
    padding: "6px",
  },

  btnGroup: {
    bottom: "10px",
  },
  dataRow: {},
  select: {
    position: "relative",
    bottom: "6px",
  },
  header: {
    background: "#EEEEEE",
  },
  info: {
    margin: "1.4rem",
  },
  overlay: {
    opacity: 0.5,
  },
  card: {
    boxShadow: "5px 5px 10px black",
  },
}));

const Form = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    dirty,
    isValid,
    setValues,
    isSubmitting,
    editEmpData,
  } = props;
  console.log("props ", props);

  const classes = useStyles();
  const customHandleChange = (event) => {
    props.reset();
    handleChange(event);
  };

  return (
    <Paper elevation={6} className={"flex justify-center p-4"}>
      {/* <Card className={`flex ${classes.card}`} elevation={6}> */}
      <form onSubmit={handleSubmit} style={{ width: "600px" }}>
        {/* <div>General Information</div> */}

        <div className="flex p-3">
          <div className="flex-1 mx-1">
            <TextField
              id="firstName"
              name="firstName"
              className="w-full"
              error={touched.firstName && !!errors.firstName}
              label="FirstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              helperText={
                touched.firstName && !!errors.firstName && errors.firstName
              }
              required
            />
          </div>
          <div className="flex-1 mx-1">
            <TextField
              id="lastName"
              name="lastName"
              className="w-full"
              error={touched.lastName && !!errors.lastName}
              label="LastName"
              required
              onChange={handleChange}
              value={values.lastName}
              onBlur={handleBlur}
              helperText={
                touched.lastName && !!errors.lastName && errors.lastName
              }
            />
          </div>
        </div>
        {/* </div> */}

        <div className="flex p-3">
          <div className="flex-1 mx-1">
            <TextField
              id="email"
              name="email"
              className="w-full"
              error={touched.email && !!errors.email}
              label="Email"
              required
              onChange={customHandleChange}
              value={values.email}
              onBlur={handleBlur}
              helperText={touched.email && !!errors.email && errors.email}
            />
            <div className="text-red-600">{props.msg}</div>
          </div>
          <div className="flex-1 mx-1">
            <TextField
              id="phoneNumber"
              label="phoneNumber"
              className="w-full"
              error={touched.phoneNumber && !!errors.phoneNumber}
              required
              onChange={handleChange}
              value={values.phoneNumber}
              onBlur={handleBlur}
              inputProps={{ maxLength: 10 }}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              helperText={
                touched.phoneNumber &&
                !!errors.phoneNumber &&
                errors.phoneNumber
              }
            />
          </div>
        </div>

        <div className="flex p-3">
          <div className="flex-1 mx-1">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                style={{ margin: "0" }}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="dob"
                name="dob"
                label="DOB"
                value={values.dob}
                onChange={(event) => {
                  console.log("value: ", event);
                  setValues({
                    ...values,
                    dob: new Date(event).toISOString(),
                  });
                }}
                // onBlur={handleBlur}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                // error={touched.dob && !!errors.dob}
              />
            </MuiPickersUtilsProvider>
            {/* <TextField
              id="dob"
              name="dob"
              className="w-full"
              error={touched.dob && !!errors.dob}
              label="DOB"
              required
              onChange={handleChange}
              value={values.dob}
              onBlur={handleBlur}
              helperText={touched.dob && !!errors.dob && errors.dob}
            /> */}
          </div>
          <div className="flex-1 mx-1">
            {/* <TextField
              id="birthPlace"
              label="birthPlace"
              className="w-full"
              error={touched.birthPlace && !!errors.birthPlace}
              required
              onChange={handleChange}
              value={values.birthPlace}
              onBlur={handleBlur}
              helperText={
                touched.birthPlace && !!errors.birthPlace && errors.birthPlace
              }
            /> */}
            {/* <TextField
              id="joinDate"
              name="joinDate"
              className="w-full"
              error={touched.joinDate && !!errors.joinDate}
              label="joinDate"
              required
              onChange={handleChange}
              value={values.joinDate}
              onBlur={handleBlur}
              helperText={
                touched.joinDate && !!errors.joinDate && errors.joinDate
              }

            /> */}
            <TextField
              id="department"
              label="department"
              className="w-full"
              error={touched.department && !!errors.department}
              required
              onChange={handleChange}
              value={values.department}
              onBlur={handleBlur}
              helperText={
                touched.department && !!errors.department && errors.department
              }
            />
          </div>
        </div>

        <div className="flex p-3">
          <div className="flex-1 mx-1">
            {/* <TextField
              id="joinDate"
              name="joinDate"
              className="w-full"
              error={touched.joinDate && !!errors.joinDate}
              label="joinDate"
              required
              onChange={handleChange}
              value={values.joinDate}
              onBlur={handleBlur}
              helperText={
                touched.joinDate && !!errors.joinDate && errors.joinDate
              }
            /> */}
            {/* <TextField
              id="gender"
              label="gender"
              className="w-full"
              error={touched.gender && !!errors.gender}
              required
              onChange={handleChange}
              value={values.gender}
              onBlur={handleBlur}
              helperText={touched.gender && !!errors.gender && errors.gender}
            /> */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="flex-1 mx-1">
            {/* <TextField
              id="department"
              label="department"
              className="w-full"
              error={touched.department && !!errors.department}
              required
              onChange={handleChange}
              value={values.department}
              onBlur={handleBlur}
              helperText={
                touched.department && !!errors.department && errors.department
              }
            /> */}
            <TextField
              id="salary"
              name="salary"
              className="w-full"
              error={touched.salary && !!errors.salary}
              label="salary"
              required
              onChange={handleChange}
              value={values.salary}
              onBlur={handleBlur}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              helperText={touched.salary && !!errors.salary && errors.salary}
            />
          </div>
        </div>

        <div className="flex p-3">
          <div className="flex-1 mx-1">
            <TextField
              id="country"
              name="country"
              className="w-full"
              error={touched.country && !!errors.country}
              label="country"
              required
              onChange={handleChange}
              value={values.country}
              onBlur={handleBlur}
              helperText={touched.country && !!errors.country && errors.country}
            />
          </div>
          <div className="flex-1 mx-1">
            <TextField
              id="state"
              label="state"
              className="w-full"
              error={touched.state && !!errors.state}
              required
              onChange={handleChange}
              value={values.state}
              onBlur={handleBlur}
              helperText={touched.state && !!errors.state && errors.state}
            />
          </div>
        </div>

        {/* <div className="flex p-3">
          <div className="flex-1 mx-1">
            <TextField
              id="district"
              name="district"
              className="w-full"
              error={touched.district && !!errors.district}
              label="district"
              required
              onChange={handleChange}
              value={values.district}
              onBlur={handleBlur}
              helperText={
                touched.district && !!errors.district && errors.district
              }
            />
          </div>
          <div className="flex-1 mx-1">
            <TextField
              id="zipcode"
              name="zipcode"
              className="w-full"
              error={touched.zipcode && !!errors.zipcode}
              label="zipcode"
              required
              onChange={handleChange}
              value={values.zipcode}
              onBlur={handleBlur}
              helperText={touched.zipcode && !!errors.zipcode && errors.zipcode}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
        </div> */}
        {isSubmitting && (
          <div className="flex justify-center">
            <CircularProgress color="secondary" />
          </div>
        )}
        <div className="sm:flex justify-center m-4" style={{ margin: "20px" }}>
          <ButtonGroup>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!dirty || isSubmitting || !isValid}
              className="mx-1"
            >
              {editEmpData ? "Edit" : " Save"}
            </Button>
            <Button
              color="secondary"
              variant="contained"
              type="reset"
              className="mx-1"
              onClick={() => {
                props.toggleDialog();
                props.reset();
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </div>
      </form>
      {/* </Card> */}
    </Paper>
  );
};

const UserForm = withFormik({
  mapPropsToValues: (props) => ({
    firstName: props?.editEmpData?.firstName ? props.editEmpData.firstName : "",
    lastName: props?.editEmpData?.lastName ? props.editEmpData.lastName : "",
    // dob: props?.editEmpData?.dob ? props.editEmpData.dob : "",
    dob: props?.editEmpData?.dob ? props.editEmpData.dob : new Date(),
    // birthPlace: props?.editEmpData?.birth_place
    //   ? props.editEmpData?.birth_place
    //   : "",
    // joinDate: props?.editEmpData?.join_date ? props.editEmpData.join_date : "",
    department: props?.editEmpData?.detail_ref?.department
      ? props?.editEmpData?.detail_ref?.department
      : "",
    // panCardNumber: props?.editEmpData?.pan_card_no
    //   ? props.editEmpData.pan_card_no
    //   : "",
    gender: props?.editEmpData?.gender ? props.editEmpData.gender : "",
    phoneNumber: props?.editEmpData?.phone ? props?.editEmpData?.phone : "",
    email: props?.editEmpData?.email ? props.editEmpData.email : "",
    salary: props?.editEmpData?.detail_ref?.salary
      ? props?.editEmpData?.detail_ref?.salary
      : "",
    // maritalStatus: props.editEmpData?.maritial_status
    //   ? props.editEmpData.maritial_status
    //   : "",
    country: props?.editEmpData?.detail_ref?.country
      ? props?.editEmpData?.detail_ref?.country
      : "",
    state: props?.editEmpData?.detail_ref?.state
      ? props?.editEmpData?.detail_ref?.state
      : "",
    // district: props?.editEmpData?.detail_ref?.district
    //   ? props?.editEmpData?.detail_ref?.district
    //   : "",
    // zipcode: props?.editEmpData?.detail_ref?.zip_code
    //   ? props?.editEmpData?.detail_ref?.zip_code
    //   : "",
  }),

  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    // dob: Yup.string().required("This field is required"),
    // birthPlace: Yup.string().required("This field is required"),
    // joinDate: Yup.string().required("This field is required"),
    department: Yup.string().required("This field is required"),
    // panCardNumber: Yup.string().required("This field is required"),
    gender: Yup.string().required("This field is required"),
    phoneNumber: Yup.string()
      .required("This field is required")
      .matches(/^[0-9]{10}$/i, "Invalid phone number"),
    email: Yup.string()
      .required("This field is required")
      .email("Email is not valid"),
    // maritalStatus: Yup.string().required("This field is required"),
    country: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    // district: Yup.string().required("This field is required"),
    salary: Yup.string().required("This field is required"),
    // zipcode: Yup.string().required("This field is required"),
  }),

  handleSubmit: async (values, { setSubmitting, setErrors, props }) => {
    try {
      setSubmitting(true);
      console.log("props gg", props);
      if (props.editEmpData) {
        await props.editEmployee(props.editEmpData._id, values);
      } else {
        const resp = await props.addEmployee(values);
        if (!resp) {
          setErrors({ email: "EMAIL ALREADY IN USE ...!" });
          return;
        }
      }
      props.toggleDialog();
      props.reset();
      setSubmitting(false);
    } catch (error) {
      console.log("Error", error);
    }
  },

  displayName: "BasicForm",
})(Form);
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addEmployee, toggleDialog, reset }, dispatch);
};
const mapStateToProps = (state) => {
  return {
    msg: state.ui.msg,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
