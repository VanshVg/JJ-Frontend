import { createBrowserRouter, RouterProvider } from "react-router-dom";
import customerRoutes from "./modules/Customer/Routes";
import authenticationRoutes from "./modules/Authentication/Routes";

const Router = () => {
  const router = createBrowserRouter([
    ...customerRoutes,
    ...authenticationRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
