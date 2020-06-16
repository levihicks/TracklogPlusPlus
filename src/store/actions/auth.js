import * as actionTypes from "./actionTypes";
import axios from "axios";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.LOGOUT,
  };
};

export const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_START,
  };
};

export const getUserSuccess = (p) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    user: p,
  };
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  const expDate = localStorage.getItem("expirationDate");
  if (token && expDate && expDate > Date.now()) {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    config.headers["x-auth-token"] = token;
    return (dispatch) => {
      dispatch(getUserStart());
      axios
        .get("http://localhost:5000/users/user", config)
        .then((res) => dispatch(getUserSuccess(res.data)))
        .catch((err) => dispatch(authFail(err)));
    };
  } else return (dispatch) => dispatch(getUserSuccess(null));
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (p) => {
  localStorage.setItem("token", p.token);
  localStorage.setItem("expirationDate", Date.now() + 3600 * 1000);
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: p.user,
  };
};

export const authFail = (err) => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

export const auth = (email, pass, loggingIn) => {
  return (dispatch) => {
    dispatch(authStart());

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ email, pass });

    axios
      .post(
        loggingIn
          ? "http://localhost:5000/users/login"
          : "http://localhost:5000/users/create",
        body,
        config
      )
      .then((res) => dispatch(authSuccess(res.data)))
      .catch((err) => dispatch(authFail(err)));
  };
};
