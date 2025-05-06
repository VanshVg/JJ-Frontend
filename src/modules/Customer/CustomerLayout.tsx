import { Outlet, useNavigate } from "react-router-dom";
import { logoPath } from "../../types/constants";
import Navbar from "./components/Navbar/Navbar";
import { ICustomerRoutes } from "./types";

const CustomerLayout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <img
          src={logoPath}
          className="h-[130px] w-[130px] md:h-[150px] md:w-[150px] cursor-pointer mx-auto"
          onClick={() => navigate(ICustomerRoutes.Home)}
        />
      </div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default CustomerLayout;
