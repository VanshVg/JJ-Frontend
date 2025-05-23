import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { toastReducer } from "./slices/toast.slice";

const persistConfig = {
  key: "JJ",
  storage,
};

const rootReducer = combineReducers({
  toast: toastReducer,
});

export default persistReducer(persistConfig, rootReducer);
