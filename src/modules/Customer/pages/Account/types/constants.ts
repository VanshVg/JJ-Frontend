import {
  AiOutlineHistory,
  AiOutlineLock,
  AiOutlineLogout,
  AiOutlineMenuUnfold,
  AiOutlineStar,
  AiOutlineUser,
} from "react-icons/ai";
import { IAccountRoutes } from "../../../types";
import { IMenuItems } from ".";

export const menuItems: IMenuItems[] = [
  {
    title: "Profile",
    items: [
      {
        icon: AiOutlineUser,
        title: "Edit Profile",
        path: IAccountRoutes.EditProfile,
      },
      {
        icon: AiOutlineMenuUnfold,
        title: "Saved Addresses",
        path: IAccountRoutes.EditProfile,
      },
      {
        icon: AiOutlineLock,
        title: "Change Password",
        path: IAccountRoutes.EditProfile,
      },
    ],
  },
  {
    title: "Activity",
    items: [
      {
        icon: AiOutlineStar,
        title: "Reviews",
        path: IAccountRoutes.EditProfile,
      },
      {
        icon: AiOutlineHistory,
        title: "Order History",
        path: IAccountRoutes.EditProfile,
      },
      {
        icon: AiOutlineLock,
        title: "Change Password",
        path: IAccountRoutes.EditProfile,
      },
    ],
  },
];
