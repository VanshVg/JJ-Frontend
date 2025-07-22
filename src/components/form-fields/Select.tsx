import { IOption, ISelectProps } from "../types";

const Select = ({ options, defaultValue, setValue }: ISelectProps) => {
  return (
    <select>
      {options.map((e: IOption) => (
        <option
          value={e.value}
          defaultValue={defaultValue}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          {e.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
