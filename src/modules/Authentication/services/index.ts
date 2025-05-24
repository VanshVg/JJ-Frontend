import { useAxiosPost } from "../../../hooks/useAxios";
import { IRegister } from "../types";
import { AUTH_APP_BASE_PATH } from "../types/constants";

export const useRegisterApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPost();

  const registerApi = async (payload: IRegister) => {
    return callApi(`${AUTH_APP_BASE_PATH}/register`, payload);
  };

  return { registerApi, isError, isLoading };
};
