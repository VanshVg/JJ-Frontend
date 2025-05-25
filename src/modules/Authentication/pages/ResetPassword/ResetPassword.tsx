import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../../components/form-fields/Input";
import { beigeLogoPath } from "../../../../types/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../../../Customer/types";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../components/types";
import { IAuthenticationRoutes, IResetPassword } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../schemas";
import { useEffect } from "react";
import { useResetPasswordApi } from "../../services";
import { ResponseType } from "../../../../types";

const ResetPassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IResetPassword>({
    resolver: yupResolver(resetPasswordSchema),
  });
  const navigate = useNavigate();
  const location = useLocation();

  const { resetPasswordApi, isLoading } = useResetPasswordApi();

  useEffect(() => {
    const token = location?.state?.token;
    if (!token) {
      navigate(IAuthenticationRoutes.Login);
    }
  }, [location]);

  const submitHandler: SubmitHandler<IResetPassword> = async (
    passwordData: IResetPassword
  ) => {
    const { data } = await resetPasswordApi(
      passwordData,
      location?.state?.token
    );
    if (data && data.responseType === ResponseType.Success) {
      navigate(IAuthenticationRoutes.Login);
    }
  };

  return (
    <div className="sm:flex sm:h-screen sm:justify-center sm:items-center">
      <div className="flex h-screen justify-center bg-primary flex-col sm:block sm:p-6 sm:w-[60%] sm:h-[90%] sm:shadow-lg sm:rounded lg:w-[45%] lg:h-[95%] xl:h-[90%] xl:w-[30%]">
        <div className="h-[35%]">
          <img
            src={beigeLogoPath}
            className="h-[130px] w-[130px]  cursor-pointer mx-auto"
            onClick={() => navigate(ICustomerRoutes.Home)}
          />
          <h1 className="text-[26px] text-beige font-primary">
            Reset Password
          </h1>
        </div>
        <form
          className="h-[65%] w-full bg-beige p-6 rounded rounded-tl-[50px]"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="px-4 mt-8 w-full">
            <Input
              name="password"
              control={control}
              type="password"
              placeholder="Enter a new password"
              errors={errors}
              externalClasses="w-full mt-4"
            />
            <Input
              name="confirm_password"
              control={control}
              type="password"
              placeholder="Confirm a new password"
              errors={errors}
              externalClasses="w-full mt-4"
            />
          </div>
          <Button
            label="Reset Password"
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
            displayType={ButtonDisplayType.Primary}
            externalClasses="text-[12px] mx-auto py-3 px-4 mt-8 lg:text-[14px]"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
