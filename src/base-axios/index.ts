/* eslint-disable no-underscore-dangle */
import axios from "axios";
import { REACT_APP_API_URL } from "../config/env.config";

export const Axios = axios.create({ baseURL: `${REACT_APP_API_URL}` });

export const setupAxios = () => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  Axios.interceptors.request.use((request) => {
    request.headers["accept-timezone"] = timeZone;

    request.withCredentials = true;
    return request;
  });

  Axios.interceptors.response.use(
    (res) => {
      return res.data;
    },
    async (e) => {
      const originalRequest = e.config;
      if (e.response && e.response.status === 401) {
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          return Axios(originalRequest);
        }
        return;
      }
      if (
        e.response.status === 400 ||
        e.response.status === 500 ||
        e.response.status === 401 ||
        e.response.status === 422
      ) {
      }
      throw e.response.data;
    }
  );
};

export default axios;
