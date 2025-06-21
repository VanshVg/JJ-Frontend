import { createBrowserRouter, RouterProvider } from "react-router-dom";
import customerRoutes from "./modules/Customer/Routes";
import authenticationRoutes from "./modules/Authentication/Routes";
import productRoutes from "./modules/Product/Routes";

const Router = () => {
  const router = createBrowserRouter([
    ...customerRoutes,
    ...authenticationRoutes,
    ...productRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
