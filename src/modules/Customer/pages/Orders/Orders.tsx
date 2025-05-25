import { useSelector } from "react-redux";
import { getAuth } from "../../../../redux/slices/auth.slice";
import { IAuthenticationRoutes } from "../../../Authentication/types";
import { Navigate } from "react-router-dom";

const Orders = () => {
  const { isAuthenticated } = useSelector(getAuth);

  if (!isAuthenticated) {
    return <Navigate to={IAuthenticationRoutes.Login} />;
  }
  return (
    <div className="mt-6">
      <h1 className="font-primary text-[35px]">Orders Page</h1>
    </div>
  );
};

export default Orders;
