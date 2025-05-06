import { JSX } from "react";
import { RouteObject } from "react-router-dom";

export interface IRoutes {
  path: string;
  element: JSX.Element;
  children?: RouteObject[];
}
