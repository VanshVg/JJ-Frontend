import { useAxiosGet } from "../../../../../hooks/useAxios";
import { PRODUCTS_APP_BASE_PATH } from "../../Shop/types/constants";

export const useFetchProductByIdApi = () => {
  const [callApi, { isError, isLoading, isSuccess }] = useAxiosGet();

  const fetchProductByIdApi = async (productId: number) => {
    return callApi(`${PRODUCTS_APP_BASE_PATH}/${productId}`);
  };

  return { fetchProductByIdApi, isError, isLoading, isSuccess };
};
