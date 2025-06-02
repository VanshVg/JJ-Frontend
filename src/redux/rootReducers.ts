import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { toastReducer } from "./slices/toast.slice";
import { authReducer } from "./slices/auth.slice";
import { searchReducer } from "./slices/search.slice";

const persistConfig = {
  key: "JJ",
  storage,
};

const rootReducer = combineReducers({
  toast: toastReducer,
  auth: authReducer,
  search: searchReducer,
});

export default persistReducer(persistConfig, rootReducer);
