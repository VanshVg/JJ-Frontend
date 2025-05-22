import { useForm } from "react-hook-form";
import Input from "../../../../components/form-fields/Input";
import { IForgotPassword } from "../types";
import { beigeLogoPath } from "../../../../types/constants";
import { useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../../../Customer/types";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../components/types";

const ForgotPassword = () => {
  const {
    control,
    formState: { errors },
  } = useForm<IForgotPassword>();
  const navigate = useNavigate();

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
        <div className="h-[65%] w-full bg-beige p-6 rounded rounded-tl-[50px]">
          <div className="px-4 w-full">
            <p className="text-primary text-[12px] lg:text-[14px] text-justify mb-6">
              Enter your registered mobile number to receive an OTP. Once you
              receive it, please verify the OTP to reset your password.
            </p>
            <Input
              name="contact_no"
              control={control}
              type="text"
              placeholder="Mobile Number"
              errors={errors}
              externalClasses="w-full mt-4"
            />
          </div>
          <Button
            label="Send OTP"
            displayType={ButtonDisplayType.Primary}
            externalClasses="text-[12px] mx-auto py-3 px-4 mt-8 lg:text-[14px]"
            onClickHandler={() => navigate(ICustomerRoutes.Shop)}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
