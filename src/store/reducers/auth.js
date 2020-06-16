import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  user: null,
};

const logout = (state, action) => {
  // localStorage.removeItem("token");
  return updateObject(state, { loading: false, user: null });
};

const getUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getUserSuccess = (state, action) => {
  return updateObject(state, { loading: false, user: action.user });
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    loading: false,
  });
};

const authFail = (state, action) => {
  // localStorage.removeItem("token");
  return updateObject(state, {
    error: action.error,
    loading: false,
    user: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_START:
      return getUserStart(state, action);
    case actionTypes.GET_USER_SUCCESS:
      return getUserSuccess(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
