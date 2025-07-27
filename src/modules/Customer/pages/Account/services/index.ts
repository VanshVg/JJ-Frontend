import {
  useAxiosDelete,
  useAxiosGet,
  useAxiosPost,
  useAxiosPut,
} from "../../../../../hooks/useAxios";
import { IAddAddress, IChangePassword, IEditProfile } from "../types";
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

export const useFetchUserAddressApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosGet();

  const fetchUserAddressApi = async () => {
    return callApi(`${USERS_APP_BASE_PATH}/address`);
  };

  return { fetchUserAddressApi, isError, isLoading };
};

export const useEditAddressApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPut();

  const editAddressApi = async (payload: IAddAddress) => {
    return callApi(`${USERS_APP_BASE_PATH}/address`, payload);
  };

  return { editAddressApi, isError, isLoading };
};

export const useDeleteAddressApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosDelete();

  const deleteAddressApi = async (addressId?: number) => {
    return callApi(`${USERS_APP_BASE_PATH}/address/${addressId}`);
  };

  return { deleteAddressApi, isError, isLoading };
};

export const useChangePasswordApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPut();

  const changePasswordApi = async (payload: IChangePassword) => {
    return callApi(`${USERS_APP_BASE_PATH}/password`, payload);
  };

  return { changePasswordApi, isError, isLoading };
};
