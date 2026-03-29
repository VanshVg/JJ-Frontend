import { createBrowserRouter, RouterProvider } from "react-router-dom";
import customerRoutes from "./modules/Customer/Routes";
import authenticationRoutes from "./modules/Authentication/Routes";
import adminRoutes from "./modules/Admin/Routes";

const Router = () => {
  const router = createBrowserRouter([
    ...customerRoutes,
    ...authenticationRoutes,
    ...adminRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
