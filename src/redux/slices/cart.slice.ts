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
          is_selected: true,
        };
      } else {
        state.cartData.push({ ...action.payload, is_selected: true });
      }
    },

    toggleSelection(
      state: CartInterface,
      action: PayloadAction<{ toggleType: boolean }>
    ) {
      state.cartData = state.cartData.map((e) => ({
        ...e,
        is_selected: action.payload.toggleType,
      }));
    },

    removeProductFromCart(
      state: CartInterface,
      action: PayloadAction<{ productId: number }>
    ) {
      state.cartData = state.cartData.filter(
        (e) => e.product.id !== action.payload.productId
      );
    },

    updateCartData(
      state: CartInterface,
      action: PayloadAction<{
        quantity?: number;
        is_selected?: boolean;
        productId: number;
      }>
    ) {
      const { quantity, is_selected, productId } = action.payload;
      state.cartData = state.cartData.map((e) => {
        if (e.product.id === productId) {
          return {
            ...e,
            ...(quantity && { quantity }),
            ...(typeof is_selected === "boolean" && { is_selected }),
          };
        } else {
          return e;
        }
      });
    },
  },
});

export const { reducer: cartReducer } = cartSlice;

export const getCart = (state: RootState) => state.cart;

export const {
  clearCart,
  updateCart,
  toggleSelection,
  removeProductFromCart,
  updateCartData,
} = cartSlice.actions;

export default cartSlice;
