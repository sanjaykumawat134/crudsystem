import * as Actions from "../Action/EmpActions";

const intialState = {
  empList: [],
  isDialogOpen: false,
  editEmp: null,
};

const empReducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.GETALL_EMPLOYEES: {
      return {
        ...state,
        empList: action.payload.map((emp) => {
          return {
            id: emp._id,
            dob: emp.dob,
            email: emp.email,
            firstName: emp.firstName,
            lastName: emp.lastName,
          };
        }),
      };
    }
    case Actions.TOGGLE_EDIT_DIALOG: {
      return {
        ...state,
        isDialogOpen: !state.isDialogOpen,
        editEmp: {
          ...state.editEmp,
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default empReducer;
