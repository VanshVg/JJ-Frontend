import { JSX, MouseEvent } from "react";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import { RouteObject } from "react-router-dom";

export interface IRoutes {
  path: string;
  element: JSX.Element;
  children?: RouteObject[];
}

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
