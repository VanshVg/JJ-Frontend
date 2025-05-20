import { useForm } from "react-hook-form";
import Input from "../../../../components/form-fields/Input";
import { ILogin } from "../types";
import { beigeLogoPath } from "../../../../types/constants";
import { Link, useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../../../Customer/types";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../types";
import { IAuthenticationRoutes } from "../../types";

const Register = () => {
  const {
    control,
    formState: { errors },
  } = useForm<ILogin>();
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
          <p className="text-[16px] text-beige font-primary ">Ready to shop?</p>
          <h1 className="text-[26px] text-beige font-primary">Login</h1>
        </div>
        <div className="h-[65%] w-full bg-beige p-6 rounded rounded-tl-[50px]">
          <div className="px-4 w-full">
            <Input
              name="contact_no"
              control={control}
              type="text"
              placeholder="Mobile Number"
              errors={errors}
              externalClasses="w-full mt-4"
            />
            <Input
              name="password"
              control={control}
              type="password"
              placeholder="Enter a password"
              errors={errors}
              externalClasses="w-full mt-4"
            />
          </div>

          <Link
            className="text-[12px] mt-6 block text-primary lg:text-[14px] hover:underline cursor-pointer"
            to={IAuthenticationRoutes.ForgotPassword}
          >
            Forgot Password?
          </Link>
          <Button
            label="Sign In"
            displayType={ButtonDisplayType.Primary}
            externalClasses="text-[12px] mx-auto py-3 px-4 mt-6 md:mt-4 lg:mt-6 lg:text-[14px]"
            onClickHandler={() => navigate(ICustomerRoutes.Shop)}
          />
          <p className="text-[12px] mt-6 text-primary lg:text-[14px]">
            Are you a new customer?{" "}
            <Link
              className="text-blue-700 hover:underline cursor-pointer"
              to={IAuthenticationRoutes.Register}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
