import { ICustomerRoutes } from ".";
import { AiOutlineUser } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";

export const navMenuMiddleElements = [
  {
    label: "Home",
    path: ICustomerRoutes.Home,
  },
  {
    label: "Shop",
    path: ICustomerRoutes.Home,
  },
  {
    label: "About Us",
    path: ICustomerRoutes.Home,
  },
  {
    label: "Orders",
    path: ICustomerRoutes.Home,
  },
];

export const navMenuCornerElements = [
  {
    label: "Cart",
    path: ICustomerRoutes.Home,
    icon: BsCartFill,
  },
  {
    label: "Account",
    path: ICustomerRoutes.Home,
    icon: AiOutlineUser,
  },
];
