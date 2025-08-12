import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { toastReducer } from "./slices/toast.slice";
import { authReducer } from "./slices/auth.slice";
import { searchReducer } from "./slices/search.slice";
import { cartReducer } from "./slices/cart.slice";

const persistConfig = {
  key: "JJ",
  storage,
  blacklist: ["search"],
};

const rootReducer = combineReducers({
  toast: toastReducer,
  auth: authReducer,
  search: searchReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
