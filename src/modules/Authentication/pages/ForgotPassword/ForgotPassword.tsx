import { SubmitHandler, useForm } from "react-hook-form";
import { beigeLogoPath } from "../../../../types/constants";
import { useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../../../Customer/types";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../components/types";
import { IAuthenticationRoutes, IForgotPassword } from "../../types";
import ContactInput from "../../../../components/form-fields/ContactInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../schemas";
import { useForgotPasswordApi } from "../../services";
import { ResponseType } from "../../../../types";

const ForgotPassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const navigate = useNavigate();

  const { forgotPasswordApi, isLoading } = useForgotPasswordApi();

  const submitHandler: SubmitHandler<IForgotPassword> = async (
    forgotPasswordData: IForgotPassword
  ) => {
    const { data } = await forgotPasswordApi(forgotPasswordData);
    if (data && data.responseType === ResponseType.Success) {
      navigate(IAuthenticationRoutes.Verification, {
        state: { token: data?.data?.token },
      });
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
          <p className="text-[16px] text-beige font-primary ">
            Forgot Password?
          </p>
          <h1 className="text-[26px] text-beige font-primary">
            Account Recovery
          </h1>
        </div>
        <form
          className="h-[65%] w-full bg-beige p-6 rounded rounded-tl-[50px]"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="px-4 w-full">
            <p className="text-primary text-[12px] lg:text-[14px] text-justify mb-6">
              Enter your registered mobile number to receive an OTP. Once you
              receive it, please verify the OTP to reset your password.
            </p>
            <ContactInput
              name="contact_no"
              control={control}
              placeholder="Mobile Number"
              errors={errors}
              externalClasses="mt-4"
            />
          </div>
          <Button
            label="Send OTP"
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

export default ForgotPassword;
