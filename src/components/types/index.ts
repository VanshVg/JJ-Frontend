import { MouseEvent } from "react";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export enum ButtonDisplayType {
  Primary = "primary",
  Secondary = "secondary",
}
export interface IButtonProps {
  label: string;
  type?: "button" | "submit";
  isLoading?: boolean;
  isDisabled?: boolean;
  displayType: ButtonDisplayType;
  onClickHandler?: (e: MouseEvent<HTMLElement>) => void;
  externalClasses?: string;
}
export interface IOtpValidationError {
  isError: boolean;
  message?: string;
}

export type FormControlProp<T extends FieldValues = FieldValues> = Control<T>;

export interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: FormControlProp<T>;
  type: string;
  placeholder: string;
  externalClasses?: string;
  isDisabled?: boolean;
  errors?: FieldErrors;
}
export interface IOtpInputProps {
  onChangeHandler: (otp: string) => void;
  value: string;
  externalClasses?: string;
  isButtonClickedOnce?: boolean;
  validationError: IOtpValidationError;
}

export interface IContactInputProps<T extends FieldValues> {
  name: Path<T>;
  control: FormControlProp<T>;
  placeholder: string;
  externalClasses?: string;
  isDisabled?: boolean;
  errors?: FieldErrors;
}
