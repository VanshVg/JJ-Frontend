import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoPath } from "../../types/constants";
import { ICustomerRoutes } from "./types";
import Navbar from "./components/Navbar";

const CustomerLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div>
        <div className="pt-4">
          <img
            src={logoPath}
            className="h-[130px] w-[130px] md:h-[150px] md:w-[150px] cursor-pointer mx-auto"
            onClick={() => navigate(ICustomerRoutes.Home)}
          />
        </div>
        <Navbar />
      </div>
      <div id="productsDiv" className={`flex-1 overflow-y-auto`}>
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerLayout;
