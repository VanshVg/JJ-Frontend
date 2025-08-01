import { useSelector } from "react-redux";
import { useAxiosPost } from "../../../../../hooks/useAxios";
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
