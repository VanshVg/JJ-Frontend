import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IRoutes } from "./types";
import { Suspense } from "react";
import customerRoutes from "./portals/Customer/Routes";

const Router = () => {
  const router = createBrowserRouter([...customerRoutes]);

  return <RouterProvider router={router} />;
};

export default Router;
