import { useForm } from "react-hook-form";
import Input from "../../../../components/form-fields/Input";
import { IRegister } from "../types";
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
  } = useForm<IRegister>();
  const navigate = useNavigate();

  return (
    <div className="sm:flex sm:h-screen sm:justify-center sm:items-center">
      <div className="flex h-screen justify-center bg-primary flex-col sm:block sm:w-[60%] sm:h-[90%] sm:shadow-lg lg:w-[40%] xl:w-[30%]">
        <div className="h-[25%] sm:h-[27%]">
          <img
            src={beigeLogoPath}
            className="h-[130px] w-[130px] md:h-[150px] md:w-[150px] cursor-pointer mx-auto"
            onClick={() => navigate(ICustomerRoutes.Home)}
          />
          <h1 className="text-[20px] text-beige font-primary -mt-2 sm:-mt-6 xl:-mt-4">
            Create Account
          </h1>
        </div>
        <div className="h-[75%] sm:h-[73%] w-full bg-beige p-6 rounded-tl-[50px]">
          <div className="mt-4 px-4 w-full">
            <Input
              name="firstname"
              control={control}
              type="text"
              placeholder="First Name"
              errors={errors}
              externalClasses="w-full mt-4"
            />
            <Input
              name="lastname"
              control={control}
              type="text"
              placeholder="Last Name"
              errors={errors}
              externalClasses="w-full mt-4"
            />
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
              placeholder="Create a password"
              errors={errors}
              externalClasses="w-full mt-4"
            />
            <Input
              name="confirm_password"
              control={control}
              type="password"
              placeholder="Confirm a password"
              errors={errors}
              externalClasses="w-full mt-4"
            />
          </div>
          <p className="text-[12px] mt-6 text-primary">
            Already have an account?{" "}
            <Link
              className="text-blue-700 hover:underline cursor-pointer"
              to={IAuthenticationRoutes.Login}
            >
              Login
            </Link>
          </p>
          <Button
            label="Create Account"
            displayType={ButtonDisplayType.Primary}
            externalClasses="text-[12px] mx-auto py-3 px-4 mt-6"
            onClickHandler={() => navigate(ICustomerRoutes.Shop)}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
