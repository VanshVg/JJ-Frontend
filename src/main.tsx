import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { setupAxios } from "./config/axios.config.ts";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Toast from "./components/Toast.tsx";

setupAxios();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toast />
    <App />
  </Provider>
);
