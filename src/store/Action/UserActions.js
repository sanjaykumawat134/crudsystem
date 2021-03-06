import axios from "axios";
import Login from "../../Components/Auth/Login";
import * as Actions from "./UiActions";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const LOGOUT = "LOGOUT";

export const getAuthToken = () => {
  return "Bearer " + localStorage.getItem("authToken");
};
export const checkLogin = () => {
  return async (dispatch) => {
    try {
      const token = getAuthToken();
      const resp = await axios.get("http://localhost:3000/users/check_login", {
        headers: {
          Authorization: token,
        },
      });

      if (resp.status === 200) {
        console.log("response of login", resp);
        dispatch({
          type: LOGIN,
          payload: resp.data,
        });
      }
    } catch (err) {
      console.log("ERR: ", err);
    }
  };
};
export const login = ({ email, password }) => {
  return async (dispatch, getState) => {
    // action for login user
    try {
      const res = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      if (res.status === 200 && res.statusText === "OK") {
        const { token } = res.data;
        const emp = {
          ...res.data.emp,
        };
        localStorage.setItem("authToken", token);
        dispatch({
          type: LOGIN,
          payload: emp,
        });
      }

      return res.status;
    } catch (error) {
      // console.log("Error", error);
      dispatch({
        type: Actions.FAILED,
        payload: "something happened wrong ...!",
      });
    }
  };
};

export const register = ({ name, password, email }) => {
  return async (dispatch, getState) => {
    try {
      const resp = await axios.post("http://localhost:3000/users/register", {
        name,
        password,
        email,
      });
      if (resp.status === 201) {
        localStorage.setItem("authToken", resp.data.token);
        dispatch({
          type: REGISTER,
          payload: resp.data.user,
        });
      }
      return resp.status;
    } catch (error) {
      dispatch({
        type: Actions.FAILED,
        payload: "Email already taken",
      });
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    try {
      const token = getAuthToken();
      console.log("token", token);
      const resp = await axios.get("http://localhost:3000/users/logout", {
        headers: {
          Authorization: token,
        },
      });
      console.log("logout resposne", resp);
      if (resp.status === 200 && resp.statusText === "OK") {
        localStorage.removeItem("authToken");
        dispatch({
          type: LOGOUT,
        });
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };
};
// export const fetchUser = () => async (dispatch, getState) => {
//   console.log("fetch user");
// };
