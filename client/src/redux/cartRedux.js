import { createSlice } from "@reduxjs/toolkit";

const findIndex = (array, element, property) => {
  return array.find((object) => {
    return object[property] === element;
  });
};

const cartSlice = createSlice({
  name: "cart",
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
    },
    removeProduct: (state, action) => {
      const productIndex = findIndex(state.products, action.payload, "_id");
      const currentProduct = state.products[productIndex];

      state.products.splice(productIndex, 1);
      state.quantity -= currentProduct.quantity;
      state.total -= currentProduct.price * currentProduct.quantity;
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
