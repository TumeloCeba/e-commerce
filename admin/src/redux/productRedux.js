import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      //console.log('getProductSuccess', action.payload)
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
     //GET ALL
     deleteProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(state.products.findIndex(
        (item) => item._id = action.payload 
      ),1);
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  }
})

export const {getProductsStart, getProductSuccess, getProductFailure,deleteProductsStart, deleteProductSuccess, deleteProductFailure } = productSlice.actions;
export default productSlice.reducer;