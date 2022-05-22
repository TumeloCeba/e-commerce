import { createSlice } from '@reduxjs/toolkit';

const findIndex = (array, element, property) => {
  let index;
  array.forEach((product, currIndex) => {
    if (product[property] === element) {
      index = currIndex;
      return;
    }
  });

  return index;
};

const returnPositive = (number) => {
  return number >= 0 ? number : 0;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      //State carries all variables in the current state
      //action carries all the variables that we're updating
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;

      return state;
    },
    removeProduct: (oldState, action) => {
      const state = {...oldState};
      const productIndex = findIndex(state.products, action.payload._id, '_id');
      const currentProduct = state.products[productIndex];

      if(currentProduct){
        state.products = state.products.filter(product => product._id !== action.payload._id);
        state.quantity =  returnPositive(state.quantity - currentProduct.quantity );
        state.total = returnPositive((state.total - currentProduct.price * currentProduct.quantity ));
      }

      return state;
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
