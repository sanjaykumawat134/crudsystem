import axios from "axios";
import { getAuthToken } from "./UserActions";

export const ADD_EMPLOYEE = "ADDEMPLOYEE";
export const DELETE_EMPLOYEE = "DELETEEMPLOYEE";
export const GETALL_EMPLOYEES = "GETALLEMPLOYEES";
export const EDIT_EMPLOYEE = "EDITEMPLOYEE";

// export const TOGGLE_EDIT_DIALOG = "TOGGLEEDITDIALOG";
export const TOGGLE_DIALOG = "TOGGLE_DIALOG";
export const getAllEmployees = () => {
  return async (dispatch, getState) => {
    try {
      const token = getAuthToken();
      const resp = await axios.get("http://localhost:3000/emp/all", {
        headers: {
          Authorization: token,
        },
      });
      console.log("response of get employee", resp);
      if (resp.status === 200 && resp.statusText === "OK") {
        dispatch({
          type: GETALL_EMPLOYEES,
          payload: resp.data || [],
        });
      }
    } catch (error) {}
  };
};
export const addEmployee = (data) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const token = getAuthToken();
      console.log("token is", token);
      const resp = await axios.post(
        "http://localhost:3000/emp/add",
        { data },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (resp.status === 201) {
        console.log("dispatching action");
        dispatch({
          type: ADD_EMPLOYEE,
          payload: resp.data.emp,
        });
      }
    } catch (error) {
      console.log("erro is", error);
    }
  };
};

export const deleteEmployee = (empId) => {
  return async (dispatch, getState) => {
    try {
      console.log("action called");
      const token = getAuthToken();
      const resp = await axios.delete(`http://localhost:3000/emp/${empId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (resp.status === 202) {
        dispatch({
          type: DELETE_EMPLOYEE,
          payload: empId,
        });
      }
    } catch (error) {
      console.log("error of delete", error);
    }
  };
};

export const getAddtionalData = (empId) => {
  return async (dispatch, getState) => {
    try {
      const token = getAuthToken();
      const resp = await axios.get("http://localhost:3000/emp/additonal_data", {
        params: {
          id: empId,
        },
        headers: {
          Authorization: token,
        },
      });
      if (resp.status === 200) {
        dispatch({
          type: TOGGLE_DIALOG,
          payload: resp.data,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
};
export const editEmployee = (empId, data) => {
  return async (dispatch, getState) => {
    try {
      const token = getAuthToken();
      const resp = await axios.put(
        `http://localhost:3000/emp/edit`,
        { data },
        {
          params: {
            id: empId,
          },
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("response of edit", resp);
      if (resp.status === 202) {
        console.log("dispatch action", resp);
        dispatch({
          type: EDIT_EMPLOYEE,
          payload: resp.data,
        });
      }
    } catch (error) {}
  };
};

export const toggleDialog = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_DIALOG,
      payload: null,
    });
  };
};
