import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const response = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(response.data.data.user));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(loginFailure());
  }
};
 
export const signUp = async (dispatch, user) => {

  try {
    const response = await publicRequest.post("/auth/signup", user);
    dispatch(loginStart());
    dispatch(loginSuccess(response.data.data.user));
  } catch (error) {
    dispatch(loginFailure());
  }
};