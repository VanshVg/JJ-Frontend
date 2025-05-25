import { useSelector } from "react-redux";
import { getAuth } from "../../../../redux/slices/auth.slice";
import { Navigate } from "react-router-dom";
import { IAuthenticationRoutes } from "../../../Authentication/types";

const Account = () => {
  const { isAuthenticated } = useSelector(getAuth);

  if (!isAuthenticated) {
    return <Navigate to={IAuthenticationRoutes.Login} />;
  }

  return (
    <div className="mt-6">
      <h1 className="font-primary text-[35px]">Account Page</h1>
    </div>
  );
};

export default Account;
