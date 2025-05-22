import { beigeLogoPath } from "../../../../types/constants";
import { useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../../../Customer/types";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../components/types";
import OTP from "../../../../components/form-fields/OTP";
import { useState } from "react";

const OtpVerification = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string>("");

  const otpChangeHandler = (value: string) => {
    console.log(value);
    setOtp(value);
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
          <p className="text-[16px] text-beige font-primary ">Almost There!</p>
          <h1 className="text-[26px] text-beige font-primary">Verify OTP</h1>
        </div>
        <div className="h-[65%] w-full bg-beige p-6 rounded rounded-tl-[50px]">
          <div className="px-4 w-full">
            <p className="text-primary text-[12px] lg:text-[14px] text-justify mb-6">
              An OTP has been sent to your registered mobile number via SMS.
              Please enter the OTP to reset your password.
            </p>
            <div className="flex justify-center mt-12">
              <OTP value={otp} onChangeHandler={otpChangeHandler} />
            </div>
          </div>
          <Button
            label="Continue"
            displayType={ButtonDisplayType.Primary}
            externalClasses="text-[12px] mx-auto py-3 px-4 mt-8 lg:text-[14px] mt-12"
            onClickHandler={() => navigate(ICustomerRoutes.Shop)}
          />
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
