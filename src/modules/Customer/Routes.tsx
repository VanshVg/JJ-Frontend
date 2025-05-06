import { lazy } from "react";
import { IRoutes } from "../../types";
import { applySuspense } from "../../utils/applySuspense";
import { ICustomerRoutes } from "./types";

const CustomerLayout = lazy(() => import("./CustomerLayout"));
const Home = lazy(() => import("./pages/Home/Home"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Account = lazy(() => import("./pages/Account/Account"));

const customerRoutes: IRoutes[] = applySuspense([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        path: ICustomerRoutes.Home,
        element: <Home />,
      },
      {
        path: ICustomerRoutes.Shop,
        element: <Shop />,
      },
      {
        path: ICustomerRoutes.Orders,
        element: <Orders />,
      },
      {
        path: ICustomerRoutes.Cart,
        element: <Cart />,
      },
      {
        path: ICustomerRoutes.Account,
        element: <Account />,
      },
    ],
  },
]);

export default customerRoutes;
