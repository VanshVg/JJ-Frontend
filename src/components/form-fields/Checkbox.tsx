import { ICheckboxProps } from "../types";

const Checkbox = ({
  externalClasses,
  name,
  value,
  onChange,
  isChecked,
  isDisabled,
  label,
}: ICheckboxProps) => {
  return (
    <div>
      <div
        className={`flex justify-between w-full gap-1 items-center ${externalClasses}`}
      >
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          checked={isChecked}
          type="checkbox"
          disabled={isDisabled}
          className="h-3 w-3 mt-[1px] rounded-[2px] border-solid border-gray-300 accent-primary hover:ring-primary duration-300 transition-all disabled:cursor-not-allowed disabled:bg-gray-200"
        />
        {label && (
          <label
            className={`ml-2 text-primart font-secondary text-[16px] font-medium text-base leading-4 ${
              isDisabled ? "text-gray-400" : ""
            }`}
            htmlFor={name}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
