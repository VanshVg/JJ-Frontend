import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressInterface, RootState } from "../types";
import { IUserAddress } from "../../modules/Customer/pages/Account/types";

const initialState: AddressInterface = {
  addresses: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    saveAddresses(
      state: AddressInterface,
      action: PayloadAction<IUserAddress[]>
    ) {
      state.addresses = action.payload;
    },

    addAddress(state: AddressInterface, action: PayloadAction<IUserAddress>) {
      state.addresses = [...state.addresses, action.payload];
    },

    removeAddress(
      state: AddressInterface,
      action: PayloadAction<{ addressId: number }>
    ) {
      state.addresses = state.addresses.filter(
        (e) => e.id !== action.payload.addressId
      );
    },

    updateAddress(
      state: AddressInterface,
      action: PayloadAction<IUserAddress>
    ) {
      state.addresses = state.addresses.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    },
  },
});

export const { reducer: addressReducer } = addressSlice;

export const getAddress = (state: RootState) => state.address;

export const { saveAddresses, addAddress, removeAddress, updateAddress } =
  addressSlice.actions;

export default addressSlice;
