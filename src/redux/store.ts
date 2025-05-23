import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducers from "./rootReducers";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

const exportStore = { store, persistor };

export default exportStore;
