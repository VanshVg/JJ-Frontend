import { useSelector } from "react-redux";
import {
  useAxiosGet,
  useAxiosPost,
  useAxiosPut,
} from "../../../../../hooks/useAxios";
import { CART_APP_BASE_PATH } from "../types/constants";
import { getCart } from "../../../../../redux/slices/cart.slice";

export const useAddToCartApi = () => {
  const [callApi, { isError, isLoading, isSuccess }] = useAxiosPost();

  const addToCartApi = async (productId: number, quantity: number) => {
    return callApi(`${CART_APP_BASE_PATH}/products/${productId}`, { quantity });
  };

  return { addToCartApi, isError, isLoading, isSuccess };
};

export const useMergeCartsApi = () => {
  const [callApi, { isError, isLoading, isSuccess }] = useAxiosPost();

  const { cartData } = useSelector(getCart);

  const mergeCartsApi = async () => {
    return callApi(`${CART_APP_BASE_PATH}/merge`, {
      cart_data: cartData.map((e) => ({
        productId: e.product.id,
        quantity: e.quantity,
      })),
    });
  };

  return { mergeCartsApi, isError, isLoading, isSuccess };
};

export const useFetchCartApi = () => {
  const [callApi, { isError, isLoading, isSuccess }] = useAxiosGet();

  const fetchCartApi = async () => {
    return callApi(`${CART_APP_BASE_PATH}`);
  };

  return { fetchCartApi, isError, isLoading, isSuccess };
};

export const useUpdateCartApi = () => {
  const [callApi, { isError, isLoading, isSuccess }] = useAxiosPut();

  const updateCartApi = async (payload: {
    quantity?: number;
    is_selected?: boolean;
  }) => {
    return callApi(`${CART_APP_BASE_PATH}/products/:id`, payload);
  };

  return { updateCartApi, isError, isLoading, isSuccess };
};

export const useToggleSelectionApi = () => {
  const [callApi, { isError, isLoading, isSuccess }] = useAxiosPut();

  const toggleSelectionApi = async (toggle_type?: boolean) => {
    return callApi(`${CART_APP_BASE_PATH}/toggle`, { toggle_type });
  };

  return { toggleSelectionApi, isError, isLoading, isSuccess };
};
