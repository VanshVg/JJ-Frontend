import { JSX } from "react";
import { RouteObject } from "react-router-dom";

export interface IRoutes {
  path: string;
  element: JSX.Element;
  children?: RouteObject[];
}

export type IApiResponse = {
  data: any;
  message: string;
  toast: boolean;
  response_type: string;
};

export enum ResponseType {
  Success = "success",
  Error = "error",
}
