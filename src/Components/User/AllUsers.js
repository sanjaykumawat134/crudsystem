import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Button,
  Paper,
  TablePagination,
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
    margin: "25px 0 0 25px",
    boxShadow: "5px 5px 20px 0px black",
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
  tColoumn: {
    padding: "10px",
  },
});
const getFormatedDate = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date(date);
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = String(dateObj.getFullYear());
  const output = month + "\n" + day + "," + year;

  return output;
};
const AllUsers = (props) => {
  const classes = useStyle();
  const {
    getAllEmployees,
    empList,
    deleteEmployee,
    getAddtionalData,
    isLoggedIn,
    totalRecords,
  } = props;
  const [deleteState, setDeleteState] = useState({
    open: false,
    empId: null,
  });
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [page, setPage] = useState(0);
  const deleteEmpHandler = (eid) => async () => {
    setDeleteState({
      open: true,
      empId: eid,
    });

    // await deleteEmployee(eid);
  };
  const handleChangePage = async (event, newPage) => {
    await getAllEmployees();
    setPage(newPage);
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

  const handleChangeRowsPerPage = (event) => {
    console.log("handleChangeRowsPerPage");
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    // console.log("isLoggedIn", isLoggedIn);
    // if (!isLoggedIn && !authenticating) {
    //   return props.history.push("/login");
    // }
    // else if (!isLoggedIn) {
    //   return props.history.push("/login");
    // }
    // if (!isLoggedIn) {
    //   return props.history.push("/login");
    // } else {
    const fetchData = async () => {
      await getAllEmployees();
    };
    if (empList.length === 0) {
      fetchData();
    }
    // }
    // }, [getAllEmployees, empList]
  }, []);

  return (
    <div style={{ padding: "25px" }}>
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
            empList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow className={classes.row}>
                  <TableCell className={classes.tColoumn}>
                    {user.firstName}
                  </TableCell>
                  <TableCell className={classes.tColoumn}>
                    {user.lastName}
                  </TableCell>
                  <TableCell className={classes.tColoumn}>
                    {user.email}
                  </TableCell>
                  <TableCell className={classes.tColoumn}>
                    {user.phone}
                  </TableCell>
                  <TableCell className={classes.tColoumn}>
                    {getFormatedDate(user.dob)}
                  </TableCell>
                  <TableCell className={classes.tColoumn}>
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
                    {/* <Tooltip title="Additional_detail">
                      <IconButton
                        className={`${classes.btn} ml-8`}
                        //   onClick={deleteEmpHandler(user.id)}
                      >
                        <Icon>more</Icon>
                      </IconButton>
                    </Tooltip> */}
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
                  style={{ padding: "10px 10px", fontSize: "1.5rem" }}
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
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            }
          />
        )}
      </Table>
      <TablePagination
        style={{ margin: "0", boxShadow: "none" }}
        className={classes.table}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        // count={empList.length}
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    empList: state.employee.empList,
    editEmp: state.employee.editEmp,
    isDialogOpen: state.employee.isDialogOpen,
    totalRecords: state.employee.totalRecords,
    isLoggedIn: state.user.isLoggedIn,
    authenticating: state.user.authenticating,
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
