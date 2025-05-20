import { useForm } from "react-hook-form";
import Input from "../../../../components/form-fields/Input";
import { IResetPassword } from "../types";
import { beigeLogoPath } from "../../../../types/constants";
import { useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../../../Customer/types";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../types";

const ResetPassword = () => {
  const {
    control,
    formState: { errors },
  } = useForm<IResetPassword>();
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
          <h1 className="text-[26px] text-beige font-primary">
            Reset Password
          </h1>
        </div>
        <div className="h-[65%] w-full bg-beige p-6 rounded rounded-tl-[50px]">
          <div className="px-4 mt-8 w-full">
            <Input
              name="password"
              control={control}
              type="text"
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
            displayType={ButtonDisplayType.Primary}
            externalClasses="text-[12px] mx-auto py-3 px-4 mt-8 lg:text-[14px]"
            onClickHandler={() => navigate(ICustomerRoutes.Shop)}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
