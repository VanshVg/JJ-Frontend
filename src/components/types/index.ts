import { ChangeEventHandler, JSX, MouseEvent } from "react";
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

export interface ICheckboxProps {
  externalClasses?: string;
  name: string;
  value: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  isChecked?: boolean;
  isDisabled?: boolean;
  label?: string;
}

export interface IQuantityProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  availableQuantity: number;
}

export interface IModalProps {
  isOpen: boolean;
  closeModal: () => void;
  confirmModal?: () => void;
  title: string;
  children?: JSX.Element | string;
  width?: string;
  buttonsText?: {
    confirm?: string;
    cancel?: string;
  };
  hideButtons?: {
    confirm?: boolean;
    cancel?: boolean;
  };
  disableButtons?: {
    confirm?: boolean;
    cancel?: boolean;
  };
}

export interface IOption {
  value: string | number;
  label: string;
}

export interface ISelectProps {
  defaultValue: string | number;
  options: IOption[];
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
}
