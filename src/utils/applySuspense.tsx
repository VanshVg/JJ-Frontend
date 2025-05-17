import { Suspense } from "react";
import { IRoutes } from "../types";

export const applySuspense = (routes: IRoutes[]) => {
  return routes.map((route) => ({
    ...route,
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>{route.element}</Suspense>
    ),
  }));
};
