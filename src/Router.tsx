import { createBrowserRouter, RouterProvider } from "react-router-dom";
import customerRoutes from "./modules/Customer/Routes";

const Router = () => {
  const router = createBrowserRouter([...customerRoutes]);

  return <RouterProvider router={router} />;
};

export default Router;
