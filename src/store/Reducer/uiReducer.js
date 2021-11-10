import * as Actions from "../Action/UiActions";

const intialState = {
  isOpen: false,
  msg: "",
};

const uiReducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.FAILED: {
      return {
        ...state,
        isOpen: true,
        msg: action.payload,
      };
    }
    case Actions.RESET: {
      return {
        ...state,
        isOpen: false,
        msg: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default uiReducer;
