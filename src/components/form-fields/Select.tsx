import { Controller, FieldValues } from "react-hook-form";
import { IOption, ISelectProps } from "../types";
import { ErrorMessage } from "@hookform/error-message";

const Select = <T extends FieldValues>({
  options,
  name,
  control,
  externalClasses,
  errors,
  isDisabled,
  placeholder,
}: ISelectProps<T>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <select
              onBlur={onBlur}
              onChange={onChange}
              value={value ?? ""}
              className={
                `p-3 border-[1px] text-[12px] font-primary border-gray-400 hover:outline-primary focus:outline-primary rounded-sm w-full} ` +
                externalClasses
              }
              disabled={isDisabled}
            >
              {placeholder && (
                <option value="" disabled hidden className="text-gray-300">
                  {placeholder}
                </option>
              )}
              {options.map((e: IOption) => (
                <option value={e.value} disabled={e.isDisabled}>
                  {e.label}
                </option>
              ))}
            </select>
          );
        }}
      />
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

export default Select;
