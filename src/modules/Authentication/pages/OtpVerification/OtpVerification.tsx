import { beigeLogoPath } from "../../../../types/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../../../Customer/types";
import Button from "../../../../components/Button";
import {
  ButtonDisplayType,
  IOtpValidationError,
} from "../../../../components/types";
import OTP from "../../../../components/form-fields/OTP";
import { useEffect, useState } from "react";
import { IAuthenticationRoutes } from "../../types";
import { useOtpVerificationApi } from "../../services";
import { ResponseType } from "../../../../types";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { otpVerificationApi, isLoading } = useOtpVerificationApi();

  const [otp, setOtp] = useState<string>("");
  const [isButtonClickedOnce, setIsButtonClickedOnce] =
    useState<boolean>(false);
  const [validationError, setValidationError] = useState<IOtpValidationError>({
    isError: false,
  });

  const otpChangeHandler = (value: string) => {
    setOtp(value);
  };

  useEffect(() => {
    const token = location?.state?.token;
    if (!token) {
      navigate(IAuthenticationRoutes.Login);
    }
  }, [location]);

  useEffect(() => {
    if (otp.length !== 6) {
      if (isButtonClickedOnce) {
        setValidationError({
          isError: true,
          message: otp.length === 0 ? "OTP is required" : "OTP is not valid",
        });
      }
    } else {
      setValidationError({
        isError: false,
      });
    }
  }, [otp, isButtonClickedOnce]);

  const submitHandler = async () => {
    setIsButtonClickedOnce(true);
    if (validationError.isError) {
      return;
    }

    const { data } = await otpVerificationApi(otp, location?.state?.token);

    if (data && data.responseType === ResponseType.Success) {
      if (location?.state?.newUser) {
        navigate(IAuthenticationRoutes.Login);
      } else {
        navigate(IAuthenticationRoutes.ResetPassword, {
          state: { token: data?.data?.accessToken },
        });
      }
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
          <p className="text-[16px] text-beige font-primary ">Almost There!</p>
          <h1 className="text-[26px] text-beige font-primary">Verify OTP</h1>
        </div>
        <form className="h-[65%] w-full bg-beige p-6 rounded rounded-tl-[50px]">
          <div className="px-4 w-full">
            <p className="text-primary text-[12px] lg:text-[14px] text-justify mb-6">
              An OTP has been sent to your registered mobile number via SMS.
              Please enter the OTP to verify your mobile number.
            </p>
            <div className="flex justify-center mt-12">
              <OTP
                value={otp}
                onChangeHandler={otpChangeHandler}
                isButtonClickedOnce={isButtonClickedOnce}
                validationError={validationError}
              />
            </div>
          </div>
          <Button
            label="Continue"
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
            displayType={ButtonDisplayType.Primary}
            externalClasses="text-[12px] mx-auto py-3 px-4 mt-8 lg:text-[14px] mt-12"
            onClickHandler={submitHandler}
          />
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
