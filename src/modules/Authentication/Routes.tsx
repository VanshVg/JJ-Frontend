import { lazy } from "react";
import { IRoutes } from "../../types";
import { applySuspense } from "../../utils/applySuspense";
import { IAuthenticationRoutes } from "./types";

const Authentication = lazy(() => import("./Authentication"));
const Register = lazy(() => import("./pages/Register/Register"));

const authenticationRoutes: IRoutes[] = applySuspense([
  {
    path: "/",
    element: <Authentication />,
    children: [
      {
        path: IAuthenticationRoutes.Register,
        element: <Register />,
      },
    ],
  },
]);

export default authenticationRoutes;
