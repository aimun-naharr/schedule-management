import axios from "axios";
import {
  deleteUserApi,
  getAllUsersApi,
  registerUserApi,
  updateUserApi,
} from "../../components/apiRoutes";
import {
  GET_ALL_USERS,
  GET_USER,
  GET_USER_DATA,
  GET_USER_TOKEN,
  PENDING,
  REJECTED,
  CREATE_USER_PENDING,
} from "../actionTypes";
const baseUrl = "https://api-jgj6.onrender.com/api/v1/";

export const loginUser = (formData, navigate) => async (dispatch) => {
  const endPoint = baseUrl + "auth/login";
  dispatch({ type: PENDING });

  try {
    const res = await axios.post(endPoint, formData);

    if (res.data?.success) {
      dispatch({
        type: GET_USER_TOKEN,
        token: res.data.token,
      });
      navigate("/");
    }
  } catch (error) {
    dispatch({ type: REJECTED, payload: error.response?.data?.error });
    console.log(error)
  }
};
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: PENDING });
  try {
    const res = await getAllUsersApi();
    if (res.data.success) {
      dispatch({
        type: GET_ALL_USERS,
        allUsers: res.data.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const registerUser = (data) => async (dispatch) => {
  // dispatch({ type: PENDING });
  try {
    const res = await registerUserApi(data);
    if (res.data.succeed) {
      dispatch(getAllUsers());
    }
  } catch (error) {
    console.log("register error", error);
    // dispatch({ type: REJECTED, payload: error.response?.data?.error });
  }
};

export const updateUser = (data, id) => async (dispatch) => {
  try {
    const res = await updateUserApi(data, id);
    if (res.data.success) {
      dispatch(getAllUsers());
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const res = await deleteUserApi(id);
    if (res.data.success) {
      dispatch(getAllUsers());
    }
  } catch (error) {}
};
export const getUserData = (data) => async (dispatch, state) => {
  const endpoint = baseUrl + "auth/me";
  try {
    const res = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    });
    if (res.data.success) {
      dispatch({
        type: GET_USER_DATA,
        user: res.data?.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
