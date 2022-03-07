import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartRedux';
//import { composeWithDevTools } from 'redux-devtools-extension';

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
})