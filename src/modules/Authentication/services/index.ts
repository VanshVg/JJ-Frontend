import { useAxiosPost } from "../../../hooks/useAxios";
import { IForgotPassword, ILogin, IRegister, IResetPassword } from "../types";
import { AUTH_APP_BASE_PATH } from "../types/constants";

export const useRegisterApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPost();

  const registerApi = async (payload: IRegister) => {
    return callApi(`${AUTH_APP_BASE_PATH}/register`, payload);
  };

  return { registerApi, isError, isLoading };
};

export const useOtpVerificationApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPost();

  const otpVerificationApi = async (otp: string, verificationToken: string) => {
    return callApi(
      `${AUTH_APP_BASE_PATH}/verify-otp?verification_token=${verificationToken}`,
      { otp }
    );
  };

  return { otpVerificationApi, isError, isLoading };
};

export const useLoginApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPost();

  const loginApi = async (payload: ILogin) => {
    return callApi(`${AUTH_APP_BASE_PATH}/login`, payload);
  };

  return { loginApi, isError, isLoading };
};

export const useForgotPasswordApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPost();

  const forgotPasswordApi = async (payload: IForgotPassword) => {
    return callApi(`${AUTH_APP_BASE_PATH}/forgot-password`, payload);
  };

  return { forgotPasswordApi, isError, isLoading };
};

export const useResetPasswordApi = () => {
  const [callApi, { isError, isLoading }] = useAxiosPost();

  const resetPasswordApi = async (
    payload: IResetPassword,
    verificationToken: string
  ) => {
    return callApi(
      `${AUTH_APP_BASE_PATH}/reset-password?verification_token=${verificationToken}`,
      payload
    );
  };

  return { resetPasswordApi, isError, isLoading };
};
