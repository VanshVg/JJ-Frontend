import { IconType } from "react-icons/lib";
import { IAccountRoutes } from "../../../types";

export interface IMenuItems {
  title: string;
  items: {
    icon: IconType;
    title: string;
    path?: IAccountRoutes;
  }[];
}

export interface IEditProfile {
  firstname: string;
  lastname: string;
  contact_no: string;
}

export enum AddressType {
  Home = "home",
  Work = "work",
  Other = "other",
}

export interface IAddAddress {
  address_line_1: string;
  address_line_2: string;
  pincode: number;
  landmark?: string;
  address_type: AddressType;
}

export interface IUserAddress {
  id: number;
  address_line_1: string;
  address_line_2: string;
  landmark?: string;
  pincode: number;
  address_type: AddressType;
}

export interface IChangePassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}
