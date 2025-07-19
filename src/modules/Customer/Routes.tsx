import { lazy } from "react";
import { IRoutes } from "../../types";
import { applySuspense } from "../../utils/applySuspense";
import { IAccountRoutes, ICustomerRoutes } from "./types";

const CustomerLayout = lazy(() => import("./CustomerLayout"));
const Home = lazy(() => import("./pages/Home/Home"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const About = lazy(() => import("./pages/About/About"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Account = lazy(() => import("./pages/Account/Account"));
const Product = lazy(() => import("./pages/Product/Product"));
const EditProfile = lazy(() => import("./pages/Account/pages/EditProfile"));
const AddressBook = lazy(() => import("./pages/Account/pages/AddressBook"));

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
        path: ICustomerRoutes.About,
        element: <About />,
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
        children: [
          {
            path: IAccountRoutes.EditProfile,
            element: <EditProfile />,
          },
          {
            path: IAccountRoutes.Address,
            element: <AddressBook />,
          },
        ],
      },
      {
        path: ICustomerRoutes.Product + "/:id",
        element: <Product />,
      },
    ],
  },
]);

export default customerRoutes;
