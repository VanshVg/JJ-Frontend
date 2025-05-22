import OTPInput from "react-otp-input";
import { IOtpInputProps } from "../types";

const OTP = ({ onChangeHandler, value }: IOtpInputProps) => {
  return (
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
  );
};

export default OTP;
