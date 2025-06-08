import { useAxiosGet } from "../../../../../hooks/useAxios";
import { IProductAPiFilters } from "../types";
import { PRODUCTS_APP_BASE_PATH } from "../types/constants";

export const useFetchProductsApi = () => {
  const [callApi, { isError, isLoading, isSuccess }] = useAxiosGet();

  const fetchProductsApi = async ({
    minPrice,
    maxPrice,
    limit,
    page,
    search,
    sortDirection,
    sortField,
  }: IProductAPiFilters) => {
    return callApi(`${PRODUCTS_APP_BASE_PATH}`, {
      params: {
        minPrice,
        maxPrice,
        limit,
        page,
        search,
        sortDirection,
        sortField,
      },
    });
  };

  return { fetchProductsApi, isError, isLoading, isSuccess };
};
