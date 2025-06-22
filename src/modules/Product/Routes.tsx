import { IRoutes } from "../../types";
import { applySuspense } from "../../utils/applySuspense";
import Product from "./Product";
import { IProductRoute } from "./types";

const productRoutes: IRoutes[] = applySuspense([
  {
    path: IProductRoute.Product + "/:id",
    element: <Product />,
  },
]);

export default productRoutes;
