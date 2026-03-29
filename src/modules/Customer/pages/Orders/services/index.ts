import { useAxiosGet, useAxiosPost, useAxiosPut } from "../../../../../hooks/useAxios";
import { IPlaceOrderPayload } from "../types";

const ORDERS_BASE_PATH = "/orders";

export const usePlaceOrderApi = () => {
  const [callApi, { isError, isLoading, isSuccess }] = useAxiosPost();

  const placeOrderApi = async (payload: IPlaceOrderPayload) => {
    return callApi(ORDERS_BASE_PATH, payload);
  };

  return { placeOrderApi, isError, isLoading, isSuccess };
};

export const useFetchOrdersApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosGet();

  const fetchOrdersApi = async (page = 1) => {
    return callApi(`${ORDERS_BASE_PATH}?page=${page}&limit=10`);
  };

  return { fetchOrdersApi, isError, isLoading };
};

export const useFetchOrderByIdApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosGet();

  const fetchOrderByIdApi = async (orderId: number) => {
    return callApi(`${ORDERS_BASE_PATH}/${orderId}`);
  };

  return { fetchOrderByIdApi, isError, isLoading };
};

export const useCancelOrderApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPut();

  const cancelOrderApi = async (orderId: number) => {
    return callApi(`${ORDERS_BASE_PATH}/${orderId}/cancel`, {});
  };

  return { cancelOrderApi, isError, isLoading };
};
