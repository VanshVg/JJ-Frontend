import { useSelector } from "react-redux";
import { getAuth } from "../../../../redux/slices/auth.slice";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { IAuthenticationRoutes } from "../../../Authentication/types";
import Menu from "./components/Menu";
import { useEffect } from "react";
import { IAccountRoutes, ICustomerRoutes } from "../../types";

const Account = () => {
  const { isAuthenticated } = useSelector(getAuth);

  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to={IAuthenticationRoutes.Login} />;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        navigate(ICustomerRoutes.Account + "/" + IAccountRoutes.EditProfile);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-6 lg:flex lg:w-[80%] lg:mx-auto">
      <div className="lg:w-[30%]">
        <Menu />
      </div>
      <div className="lg:w-[70%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
