import { useAxiosGet, useAxiosPost } from "../../../../../hooks/useAxios";
import {
  CART_APP_BASE_PATH,
  PRODUCTS_APP_BASE_PATH,
} from "../../Shop/types/constants";

export const useFetchProductByIdApi = () => {
  const [callApi, { isError, isLoading, isSuccess }] = useAxiosGet();

  const fetchProductByIdApi = async (productId: number) => {
    return callApi(`${PRODUCTS_APP_BASE_PATH}/${productId}`);
  };

  return { fetchProductByIdApi, isError, isLoading, isSuccess };
};

export const useAddToCartApi = () => {
  const [callApi, { isError, isLoading, isSuccess }] = useAxiosPost();

  const addToCartApi = async (productId: number, quantity: number) => {
    return callApi(`${CART_APP_BASE_PATH}/products/${productId}`, { quantity });
  };

  return { addToCartApi, isError, isLoading, isSuccess };
};
