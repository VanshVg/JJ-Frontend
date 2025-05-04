import { IRoutes } from "../../types";
import { applySuspense } from "../../utils/applySuspense";
import Home from "./modules/Home/Home";
import { ICustomerRoutes } from "./types";

const customerRoutes: IRoutes[] = applySuspense([
  {
    path: ICustomerRoutes.Home,
    element: <Home />,
  },
]);

export default customerRoutes;
