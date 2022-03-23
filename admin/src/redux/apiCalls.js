import {loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest, userRequest } from '../requestMethods';
import { 
  getProductFailure, 
  getProductsStart, 
  getProductSuccess,
  deleteProductFailure, 
  deleteProductsStart, 
  deleteProductSuccess,
  updateProductFailure, 
  updateProductsStart, 
  updateProductSuccess,
  addProductFailure, 
  addProductsStart, 
  addProductSuccess } from './productRedux';

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try{
    const response = await publicRequest.post('/auth/login', user);
    //console.log(response.data.data);
    dispatch(loginSuccess({...response.data.data.user, jwt: response.data.data.jwt}));
  } catch(error){
    dispatch(loginFailure());
  }
}

export const getProducts = async (dispatch) => {
  dispatch(getProductsStart());

  try{
    const response = await publicRequest.get('/products');
    dispatch(getProductSuccess(response.data.data.products));
  } catch(error){
    dispatch(getProductFailure());
  }
}

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductsStart());

  try{
     await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch(error){
    dispatch(deleteProductFailure());
  }
}

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductsStart());

  try{
     await userRequest.patch(`/products/${id}`, product);
    dispatch(updateProductSuccess({id, product}));
  } catch(error){
    dispatch(updateProductFailure());
  }
}

export const addProduct = async (product, dispatch) => {
  dispatch(addProductsStart());

  try{
     const response = await userRequest.post(`/products/`,product);
    dispatch(addProductSuccess(response.data.data.product));
  } catch(error){
    dispatch(addProductFailure());
  }
}