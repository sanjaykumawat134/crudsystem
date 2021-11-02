import * as Actions from "../Action/UserActions";

const intialState = {
  isLoggedIn: false,
  activeUser: null,
  authToken: null,
};

const UserReducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.LOGIN: {
      //   const { userData, token } = action.payload;

      return {
        ...state,
        isLoggedIn: true,
        activeUser: action.payload,
      };
    }
    case Actions.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        activeUser: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
