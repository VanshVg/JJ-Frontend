import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartInterface, RootState } from "../types";
import { ICart } from "../../types";

const initialState: CartInterface = {
  cartData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state: CartInterface) {
      state.cartData = [];
    },

    updateCart(state: CartInterface, action: PayloadAction<ICart>) {
      const productIndex = state.cartData.findIndex(
        (e) => e.product.id === action.payload.product.id
      );
      if (productIndex > -1) {
        const newQuantity =
          action.payload.quantity + state.cartData[productIndex].quantity;
        state.cartData[productIndex] = {
          ...action.payload,
          quantity:
            newQuantity <= action.payload.product.available_quantity
              ? newQuantity
              : action.payload.product.available_quantity,
        };
      } else {
        state.cartData.push(action.payload);
      }
    },
  },
});

export const { reducer: cartReducer } = cartSlice;

export const getCart = (state: RootState) => state.cart;

export const { clearCart, updateCart } = cartSlice.actions;

export default cartSlice;
