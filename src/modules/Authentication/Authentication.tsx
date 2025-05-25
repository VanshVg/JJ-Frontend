import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "../../redux/slices/auth.slice";
import { ICustomerRoutes } from "../Customer/types";

const Authentication = () => {
  const { isAuthenticated } = useSelector(getAuth);

  if (isAuthenticated) {
    return <Navigate to={ICustomerRoutes.Home} />;
  }

  return <Outlet />;
};

export default Authentication;
