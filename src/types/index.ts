import { JSX, MouseEvent } from "react";
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
