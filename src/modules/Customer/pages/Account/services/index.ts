import { useAxiosPut } from "../../../../../hooks/useAxios";
import { IEditProfile } from "../types";
import { USERS_APP_BASE_PATH } from "../types/constants";

export const useEditProfileApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPut();

  const editProfileApi = async (payload: IEditProfile) => {
    return callApi(`${USERS_APP_BASE_PATH}/profile`, payload);
  };

  return { editProfileApi, isError, isLoading };
};
