import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRoutes } from "../../types";
import { UserRoles } from "../../types";
import { applySuspense } from "../../utils/applySuspense";
import { getAuth } from "../../redux/slices/auth.slice";
import { IAdminRoutes, ICustomerRoutes } from "../Customer/types";

const AdminLayout = lazy(() => import("./AdminLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const AdminOrders = lazy(() => import("./pages/Orders/Orders"));
const AdminOrderDetail = lazy(() => import("./pages/Orders/OrderDetail"));
const AdminProducts = lazy(() => import("./pages/Products/Products"));
const ProductForm = lazy(() => import("./pages/Products/ProductForm"));
const AdminCustomers = lazy(() => import("./pages/Customers/Customers"));

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, userData } = useSelector(getAuth);

  if (!isAuthenticated || userData?.role !== UserRoles.Admin) {
    return <Navigate to={ICustomerRoutes.Home} replace />;
  }

  return <>{children}</>;
};

const adminRoutes: IRoutes[] = applySuspense([
  {
    path: "/admin",
    element: (
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    ),
    children: [
      { path: IAdminRoutes.Home, element: <Dashboard /> },
      { path: IAdminRoutes.Orders, element: <AdminOrders /> },
      { path: IAdminRoutes.Orders + "/:id", element: <AdminOrderDetail /> },
      { path: IAdminRoutes.Products, element: <AdminProducts /> },
      { path: IAdminRoutes.ProductNew, element: <ProductForm /> },
      { path: IAdminRoutes.Products + "/:id/edit", element: <ProductForm /> },
      { path: IAdminRoutes.Customers, element: <AdminCustomers /> },
    ],
  },
]);

export default adminRoutes;
