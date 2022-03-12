import {loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest } from '../requestMethods';

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try{
    const response = await publicRequest.post('/auth/login', user);
    console.log(response.data.data);
    dispatch(loginSuccess({...response.data.data.user, jwt: response.data.data.jwt}));
  } catch(error){
    dispatch(loginFailure());
  }
}