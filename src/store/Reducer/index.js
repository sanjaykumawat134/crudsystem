import { combineReducers } from "redux";
import empReducer from "./empReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  employee: empReducer,
});

export default rootReducer;
