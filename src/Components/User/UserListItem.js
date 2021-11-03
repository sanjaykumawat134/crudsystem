import IconButton from "@material-ui/core/IconButton/IconButton";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, Paper } from "@material-ui/core";
import { useState } from "react";
import User from "./User";

const useStyles = makeStyles((theme) => ({
  userData: {
    margin: "20px",
    padding: "20px",
  },
  dataItem: {
    color: "#2d2b2b",
    fontWeight: 500,
    padding: "10px 20px",
  },
  btn: {
    padding: "5px",
  },
  spanner: {
    flex: 1,
  },
  datarow: {
    padding: "5px",
  },
  data: {
    background: "#F7F7F7",
    "&:hover": {
      background: "rgba(19, 35, 50, 0.15)",
    },
  },
  overlay: {
    opacity: 0.5,
  },
  emailIcon: {
    margin: "0 5px",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      // display: "flex",
      flexDirection: "column",
      // backgroundColor: "red",
    },
  },
}));
const UserListItem = (props) => {
  const classes = useStyles();

  const {
    user,
    deleteEmployee,
    getAddtionalData,
    editEmp,
    isDialogOpen,
    editEmployee,
  } = props;
  // console.log("props", deleteEmployee);
  const deleteEmpHandler = (eid) => async () => {
    await deleteEmployee(eid);
  };
  const editEmpHandler = (empId) => async () => {
    // console.log("edit handler");
    await getAddtionalData(empId);
  };
  return (
    <div
      key={user.id}
      className={` sm:flex-nowrap flex-wrap  items-center text-gray-800 text-base border-2 m-6 font-medium  ${classes.datarow} ${classes.data} ${classes.root}`}
    >
      {/* {isDialogOpen && (
        <User editEmpData={editEmp} editEmployee={editEmployee} />
      )} */}
      {/* {state && <User />} */}
      <div className="flex w-1/5">
        <Typography variant="subtitle1">{user.firstName}</Typography>

        <Typography variant="subtitle1" className="">
          {user.lastName}
        </Typography>
      </div>

      <div className="flex flex-1">
        <EmailIcon />
        <Typography variant="subtitle1">{user.email}</Typography>
      </div>

      <div className="flex  w-1/5">
        <Typography
          variant="subtitle1"
          component="span"

          // className=" border rounded-sm border-blue-500 px-10"
        >
          {user.dob}
        </Typography>
      </div>

      <div
        className="flex  w-1/5"
        // style={{ width: "10%" }}
      >
        <Tooltip title="Edit ">
          <IconButton
            className={`${classes.btn} ml-8`}
            onClick={editEmpHandler(user.id)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            className={`${classes.btn} ml-8`}
            onClick={deleteEmpHandler(user.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserListItem;
