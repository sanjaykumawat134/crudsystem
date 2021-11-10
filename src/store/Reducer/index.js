import { combineReducers } from "redux";
import empReducer from "./empReducer";
import UserReducer from "./UserReducer";
import uiReducer from "./uiReducer";
const rootReducer = combineReducers({
  user: UserReducer,
  employee: empReducer,
  ui: uiReducer,
});

export default rootReducer;
