import * as Actions from "../Action/EmpActions";

const intialState = {
  empList: [],
  isDialogOpen: false,
  editEmp: null,
  totalRecords: 0,
};

const empReducer = (state = intialState, action) => {
  switch (action.type) {
    // case Actions.GETALL_EMPLOYEES: {
    //   return {
    //     ...state,
    //     empList: action.payload.map((emp) => {
    //       return {
    //         id: emp._id,
    //         dob: emp.dob,
    //         email: emp.email,
    //         firstName: emp.firstName,
    //         phone: emp.phone,
    //         lastName: emp.lastName,
    //       };
    //     }),
    //   };
    // }
    case Actions.GETALL_EMPLOYEES: {
      const eList = action.payload.employees.map((emp) => {
        return {
          id: emp._id,
          dob: emp.dob,
          email: emp.email,
          firstName: emp.firstName,
          phone: emp.phone,
          lastName: emp.lastName,
        };
      });
      return {
        ...state,
        empList: state.empList.concat(eList),
        totalRecords: action.payload.totalCounts,
      };
    }

    // case Actions.TOGGLE_EDIT_DIALOG: {
    //   return {
    //     ...state,
    //     isDialogOpen: !state.isDialogOpen,
    //     editEmp: {
    //       ...state.editEmp,
    //       ...action.payload,
    //     },
    //   };
    // }
    case Actions.ADD_EMPLOYEE: {
      const emp = {
        id: action.payload._id,
        dob: action.payload.dob,
        email: action.payload.email,
        phone: action.payload.phone,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
      return {
        ...state,
        empList: state.empList.concat(emp),
      };
    }
    case Actions.EDIT_EMPLOYEE: {
      // const index = state.empList.findIndex(
      //   (emp) => emp.id === action.payload._id
      // );
      // console.log("index of edit", index);
      // return {
      //   ...state,
      //   empList: [
      //     ...state.empList.slice(0, index),
      //     {
      //       id: action.payload._id,
      //       dob: action.payload.dob,
      //       email: action.payload.email,
      //       firstName: action.payload.firstName,
      //       lastName: action.payload.lastName,
      //     },
      //     ...state.empList.slice(index),
      //   ],
      return {
        ...state,
        empList: state.empList.map((emp) => {
          if (emp.id !== action.payload._id) {
            return emp;
          }
          return {
            ...emp,
            ...{
              id: action.payload._id,
              dob: action.payload.dob,
              email: action.payload.email,
              phone: action.payload.phone,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
            },
          };
        }),
      };
    }
    case Actions.DELETE_EMPLOYEE: {
      return {
        ...state,
        empList: state.empList.filter((emp) => emp.id !== action.payload),
      };
    }

    case Actions.TOGGLE_DIALOG: {
      return {
        ...state,
        isDialogOpen: !state.isDialogOpen,
        editEmp:
          action.payload == null
            ? null
            : {
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
