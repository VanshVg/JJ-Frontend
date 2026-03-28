import { lazy } from "react";
import { IRoutes } from "../../types";
import { applySuspense } from "../../utils/applySuspense";
import { IAccountRoutes, ICustomerRoutes } from "./types";

const CustomerLayout = lazy(() => import("./CustomerLayout"));
const Home = lazy(() => import("./pages/Home/Home"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const About = lazy(() => import("./pages/About/About"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const OrderDetail = lazy(() => import("./pages/Orders/OrderDetail"));
const OrderConfirmation = lazy(() => import("./pages/Orders/OrderConfirmation"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Account = lazy(() => import("./pages/Account/Account"));
const Product = lazy(() => import("./pages/Product/Product"));
const EditProfile = lazy(
  () => import("./pages/Account/pages/EditProfile/EditProfile")
);
const AddressBook = lazy(
  () => import("./pages/Account/pages/AddressBook/AddressBook")
);
const ChangePassword = lazy(
  () => import("./pages/Account/pages/ChangePassword/ChangePassword")
);

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
          {
            path: IAccountRoutes.ChangePassword,
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: ICustomerRoutes.Product + "/:id",
        element: <Product />,
      },
      {
        path: ICustomerRoutes.Checkout,
        element: <Checkout />,
      },
      {
        path: ICustomerRoutes.Orders + "/:id",
        element: <OrderDetail />,
      },
      {
        path: ICustomerRoutes.OrderConfirmation + "/:id",
        element: <OrderConfirmation />,
      },
    ],
  },
]);

export default customerRoutes;
