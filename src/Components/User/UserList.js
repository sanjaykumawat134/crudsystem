import { useEffect } from "react";
import { bindActionCreators } from "redux";
import {
  getAllEmployees,
  deleteEmployee,
  editEmployee,
  getAddtionalData,
} from "../../store/Action/EmpActions";
import { connect } from "react-redux";

import UserListItem from "./UserListItem";

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
    <div>
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
    </div>
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
