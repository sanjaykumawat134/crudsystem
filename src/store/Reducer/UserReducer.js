import * as Actions from "../Action/UserActions";

const intialState = {
  isLoggedIn: false,
  // isLoggedIn: localStorage.getItem("authToken") ? true : false,
  activeUser: null,
  authToken: null,
  authenticating: true,
};

const UserReducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.LOGIN: {
      //   const { userData, token } = action.payload;

      return {
        ...state,
        isLoggedIn: true,
        activeUser: action.payload,
        authenticating: false,
      };
    }
    case Actions.REGISTER: {
      return {
        ...state,
        isLoggedIn: true,
        activeUser: action.payload,
        authenticating: false,
      };
    }
    case Actions.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        activeUser: null,
        authenticating: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
