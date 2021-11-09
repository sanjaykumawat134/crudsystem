import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Button,
  Paper,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  getAllEmployees,
  deleteEmployee,
  editEmployee,
  getAddtionalData,
} from "../../store/Action/EmpActions";

import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import SimpleDialog from "../UI/Dialog";

const useStyle = makeStyles({
  table: {
    width: "90%",
    margin: "50px 0 0 50px",
  },
  thead: {
    "& > *": {
      background: "#000000",
      color: "#FFFFFF",
      fontSize: 20,
    },
  },
  row: {
    "& > *": {
      fontSize: 17,
    },
  },
});

const AllUsers = (props) => {
  const classes = useStyle();
  const {
    getAllEmployees,
    empList,
    deleteEmployee,
    getAddtionalData,
    isLoggedIn,
  } = props;
  const [deleteState, setDeleteState] = useState({
    open: false,
    empId: null,
  });
  const deleteEmpHandler = (eid) => async () => {
    setDeleteState({
      open: true,
      empId: eid,
    });

    // await deleteEmployee(eid);
  };
  const onClose = () => {
    setDeleteState({
      ...deleteState,
      open: false,
    });
  };
  const editEmpHandler = (empId) => async () => {
    await getAddtionalData(empId);
  };
  const deleteHandler = async () => {
    await deleteEmployee(deleteState.empId);
    onClose();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      props.history.push("/login");
    } else {
      const fetchData = async () => {
        await getAllEmployees();
      };
      // if (empList.length === 0) {
      fetchData();
    }
    // }
    // }, [getAllEmployees, empList]
  }, [isLoggedIn]);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.thead}>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>DOB</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {empList.length !== 0 ? (
          empList.map((user) => (
            <TableRow className={classes.row}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.dob}</TableCell>
              <TableCell>
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
                <Tooltip title="Additional_detail">
                  <IconButton
                    className={`${classes.btn} ml-8`}
                    //   onClick={deleteEmpHandler(user.id)}
                  >
                    <Icon>more</Icon>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className={classes.row}>
            <TableCell colSpan={6} style={{ width: "100%" }}>
              <Paper
                elevation={3}
                className="flex"
                style={{
                  padding: "50px",
                  justifyContent: "center",
                }}
              >
                <h2> No users found ...! please add </h2>
              </Paper>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {deleteState.open && (
        <SimpleDialog
          onClose={onClose}
          open={deleteState.open}
          title="Are you sure to delete employee ?"
          content={
            <div className="flex flex-col " style={{ width: "400px" }}>
              <div
                className="flex"
                style={{ padding: "10px 0", fontSize: "1.5rem" }}
              >
                <h2>This action cannot be undone later....</h2>
              </div>
              <div className="flex justify-evenly" style={{ margin: "30px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={deleteHandler}
                >
                  Confirm
                </Button>
                <Button variant="contained" color="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          }
        />
      )}
    </Table>
  );
};

const mapStateToProps = (state) => {
  return {
    empList: state.employee.empList,
    editEmp: state.employee.editEmp,
    isDialogOpen: state.employee.isDialogOpen,
    isLoggedIn: state.user.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllEmployees,
      deleteEmployee,
      editEmployee,
      getAddtionalData,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
