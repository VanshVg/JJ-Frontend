import { useAxiosPost, useAxiosPut } from "../../../../../hooks/useAxios";
import { IAddAddress, IEditProfile } from "../types";
import { USERS_APP_BASE_PATH } from "../types/constants";

export const useEditProfileApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPut();

  const editProfileApi = async (payload: IEditProfile) => {
    return callApi(`${USERS_APP_BASE_PATH}/profile`, payload);
  };

  return { editProfileApi, isError, isLoading };
};

export const useAddAddressApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPost();

  const addAddressApi = async (payload: IAddAddress) => {
    return callApi(`${USERS_APP_BASE_PATH}/address`, payload);
  };

  return { addAddressApi, isError, isLoading };
};
