import { Controller, FieldValues } from "react-hook-form";
import { IContactInputProps } from "../types";
import { ErrorMessage } from "@hookform/error-message";

const ContactInput = <T extends FieldValues>({
  name,
  control,
  placeholder,
  isDisabled,
  errors,
  externalClasses,
}: IContactInputProps<T>) => {
  return (
    <div className="relative">
      <div className="flex justify-between">
        <span
          className={
            `p-3 bg-gray border-[1px] text-[11px] font-primary placeholder-primary border-gray-400 hover:outline-primary focus:outline-primary rounded-l-sm w-[15%] flex justify-center` +
            ` ` +
            externalClasses
          }
        >
          +91
        </span>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              onBlur={onBlur}
              onChange={onChange}
              value={value || ""}
              className={
                `p-3 border-[1px] text-[11px] font-primary placeholder-primary border-gray-400 hover:outline-primary focus:outline-primary rounded-r-sm border-l-0 w-[85%]` +
                ` ` +
                externalClasses
              }
              placeholder={placeholder}
              disabled={isDisabled}
            />
          )}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="errorText flex justify-start pt-1 pl-1 text-red-600 font-medium text-[11px] text-left">
            {message}
          </span>
        )}
      />
    </div>
  );
};

export default ContactInput;
