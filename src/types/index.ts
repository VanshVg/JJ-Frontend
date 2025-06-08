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

export enum UserRoles {
  Admin = "admin",
  Customer = "customer",
}

export interface IUser {
  firstname: string;
  lastname: string;
  contact_no: string;
  role: UserRoles;
}

export enum SortTypes {
  Ascending = "ASC",
  Descending = "DESC",
}
