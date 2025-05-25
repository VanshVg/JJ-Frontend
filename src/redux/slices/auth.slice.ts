import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthInterface, RootState } from "../types";

const initialState: AuthInterface = {
  token: null,
  isAuthenticated: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogoutData(state: AuthInterface) {
      state.token = null;
      state.userData = null;
      state.isAuthenticated = false;
    },

    setCredentials(state: AuthInterface, action: PayloadAction<AuthInterface>) {
      const { token } = action.payload;
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      } else {
        state.token = null;
        state.isAuthenticated = false;
      }
    },

    setUser(state: AuthInterface, action: PayloadAction<AuthInterface>) {
      const { userData } = action.payload;
      state.userData = userData;
    },
  },
});

export const { reducer: authReducer } = authSlice;

export const getAuth = (state: RootState) => state.auth;

export const { setLogoutData, setCredentials, setUser } = authSlice.actions;

export default authSlice;
