import { useSelector } from "react-redux";
import { getAuth } from "../../../../redux/slices/auth.slice";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IAuthenticationRoutes } from "../../../Authentication/types";
import Menu from "./components/Menu";
import { useEffect, useState } from "react";
import { IAccountRoutes, ICustomerRoutes } from "../../types";

const Account = () => {
  const { isAuthenticated } = useSelector(getAuth);

  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  if (!isAuthenticated) {
    return <Navigate to={IAuthenticationRoutes.Login} />;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobile(false);
        if (location.pathname === ICustomerRoutes.Account) {
          navigate(ICustomerRoutes.Account + "/" + IAccountRoutes.EditProfile);
        }
      } else {
        setIsMobile(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-6 lg:flex lg:w-[80%] lg:mx-auto">
      <div
        className={`lg:w-[30%] ${
          location.pathname?.toLowerCase() !==
            ICustomerRoutes.Account.toLowerCase() && isMobile
            ? "hidden"
            : ""
        }`}
      >
        <Menu />
      </div>
      <div className="lg:w-[70%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
