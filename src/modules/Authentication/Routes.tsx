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
const OtpVerification = lazy(
  () => import("./pages/OtpVerification/OtpVerification")
);
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));

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
      {
        path: IAuthenticationRoutes.Verification,
        element: <OtpVerification />,
      },
      {
        path: IAuthenticationRoutes.ResetPassword,
        element: <ResetPassword />,
      },
    ],
  },
]);

export default authenticationRoutes;
