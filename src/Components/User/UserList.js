import { useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { bindActionCreators } from "redux";
import {
  getAllEmployees,
  deleteEmployee,
  editEmployee,
  getAddtionalData,
} from "../../store/Action/EmpActions";
import { connect } from "react-redux";

import UserListItem from "./UserListItem";
import { Paper } from "@material-ui/core";

const UserList = (props) => {
  const {
    getAllEmployees,
    empList,
    editEmployee,
    deleteEmployee,
    getAddtionalData,
    editEmp,
    isDialogOpen,
  } = props;

  useEffect(() => {
    const fetchData = async () => {
      await getAllEmployees();
    };
    // if (empList.length === 0) {
    fetchData();
    // }
    // }, [getAllEmployees, empList]
  }, []);
  return (
    <Paper elevation={3}>
      <div
        className={` flex   items-center text-gray-800 text-base border-2 border-black m-6 font-medium`}
      >
        <div className="flex w-1/5">
          <Typography variant="h6" className="flex-1">
            First Name
          </Typography>

          <Typography variant="h6" className="flex-1">
            Last Name
          </Typography>
        </div>

        <div className="flex flex-1">
          <Typography variant="h6">Email</Typography>
        </div>

        <div className="flex  w-1/5">
          <Typography variant="h6" component="span">
            DOB
          </Typography>
        </div>

        <div className="flex  w-1/5">
          <Typography variant="subtitle1">Actions</Typography>
        </div>
      </div>
      {empList.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          deleteEmployee={deleteEmployee}
          editEmployee={editEmployee}
          getAddtionalData={getAddtionalData}
          editEmp={editEmp}
          isDialogOpen={isDialogOpen}
        />
      ))}
    </Paper>
  );
};
const mapStateToProps = (state) => {
  return {
    empList: state.employee.empList,
    editEmp: state.employee.editEmp,
    isDialogOpen: state.employee.isDialogOpen,
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
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
