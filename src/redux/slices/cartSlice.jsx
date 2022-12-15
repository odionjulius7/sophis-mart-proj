import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price, // initially the price and then keep add to the total with the item price
        });
      } else {
        //that existing item
        existingItem.quantity++; // the quantity increases by 1
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
        // up here indicate we add the existing total price of that existing item to the newItem price, just like
        // incrementing itself with it single price to the already total price
      }

      //   getting total price
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity)
      );

      console.log(state.totalQuantity);
      console.log(state.cartItems);
      console.log(newItem);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
