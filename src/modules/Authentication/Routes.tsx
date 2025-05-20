import { lazy } from "react";
import { IRoutes } from "../../types";
import { applySuspense } from "../../utils/applySuspense";
import { IAuthenticationRoutes } from "./types";

const Authentication = lazy(() => import("./Authentication"));
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const ForgotPassword = lazy(
  () => import("./pages/ForgotPassword/ForgotPassword")
);

const authenticationRoutes: IRoutes[] = applySuspense([
  {
    path: "/",
    element: <Authentication />,
    children: [
      {
        path: IAuthenticationRoutes.Register,
        element: <Register />,
      },
      {
        path: IAuthenticationRoutes.Login,
        element: <Login />,
      },
      {
        path: IAuthenticationRoutes.ForgotPassword,
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default authenticationRoutes;
