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

export interface ICart {
  id?: number;
  cart_id?: number;
  product: {
    id: number;
    name: string;
    brand?: string;
    selling_price: number;
    available_quantity: number;
    productImages?: {
      image_url: string;
    }[];
  };
  is_selected: boolean;
  quantity: number;
}
