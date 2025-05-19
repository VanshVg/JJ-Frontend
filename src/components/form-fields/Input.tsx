import { Controller, FieldValues } from "react-hook-form";
import { InputProps } from "../../types";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ErrorMessage } from "@hookform/error-message";

const Input = <T extends FieldValues>({
  name,
  control,
  type,
  placeholder,
  isDisabled,
  errors,
  externalClasses,
}: InputProps<T>) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            onBlur={onBlur}
            onChange={onChange}
            value={value || ""}
            type={!isShow && type ? type : "text"}
            className={
              `p-3 border-[1px] text-[11px] font-primary placeholder-primary border-gray-400 hover:outline-primary focus:outline-primary rounded-sm w-full` +
              ` ` +
              externalClasses
            }
            placeholder={placeholder}
            disabled={isDisabled}
          />
        )}
      />
      {type === "password" && (
        <div
          className="absolute right-2 top-8"
          onClick={() => setIsShow((prev) => !prev)}
        >
          {isShow ? (
            <AiFillEye color="#2b2b2b" />
          ) : (
            <AiFillEyeInvisible color="#2b2b2b" />
          )}
        </div>
      )}

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="errorText text-red-600 font-medium text-sm">
            {message}
          </span>
        )}
      />
    </div>
  );
};

export default Input;
