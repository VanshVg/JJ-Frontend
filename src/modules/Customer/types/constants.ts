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
    path: ICustomerRoutes.Shop,
  },
  {
    label: "Orders",
    path: ICustomerRoutes.Orders,
  },
];

export const navMenuCornerElements = [
  {
    label: "Cart",
    path: ICustomerRoutes.Cart,
    icon: BsCartFill,
  },
  {
    label: "Account",
    path: ICustomerRoutes.Account,
    icon: AiOutlineUser,
  },
];
