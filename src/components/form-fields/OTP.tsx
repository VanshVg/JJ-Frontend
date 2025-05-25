import OTPInput from "react-otp-input";
import { IOtpInputProps } from "../types";

const OTP = ({
  onChangeHandler,
  value,
  isButtonClickedOnce,
  validationError,
}: IOtpInputProps) => {
  return (
    <div>
      <OTPInput
        value={value}
        onChange={onChangeHandler}
        numInputs={6}
        renderSeparator={<span style={{ width: "8px" }}>-</span>}
        inputType="number"
        shouldAutoFocus={true}
        inputStyle={"otp_input"}
        renderInput={(props) => <input {...props} />}
      />
      {isButtonClickedOnce && validationError.isError && (
        <span className="errorText flex justify-start pt-3 pl-3 text-red-600 font-medium text-[11px] text-left">
          {validationError.message}
        </span>
      )}
    </div>
  );
};

export default OTP;
