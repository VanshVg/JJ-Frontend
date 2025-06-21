import axios from "axios";
import { VITE_APP_API_URL } from "../config/env.config";
import { store } from "../redux/store";
import { ToastShow } from "../redux/slices/toast.slice";

export const Axios = axios.create({ baseURL: `${VITE_APP_API_URL}` });

export const setupAxios = () => {
  Axios.interceptors.request.use((request) => {
    const storeData = store.getState();
    const token = storeData?.auth?.token;

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  });

  Axios.interceptors.response.use(
    (res) => {
      const toast = res?.data?.toast;
      const message = res?.data?.message;
      if (toast) {
        store.dispatch(
          ToastShow({
            message,
            type: "success",
          })
        );
      }
      return res;
    },
    async (e) => {
      const toast = e?.response?.data?.toast;
      const message = e?.response?.data?.message;
      if (toast) {
        store.dispatch(
          ToastShow({
            message,
            type: "error",
          })
        );
      }
    }
  );
};

export default axios;
