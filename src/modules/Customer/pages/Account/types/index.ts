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
