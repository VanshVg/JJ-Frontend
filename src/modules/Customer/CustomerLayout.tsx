import { Outlet, useNavigate } from "react-router-dom";
import { logoPath } from "../../types/constants";
import Navbar from "./components/Navbar/Navbar";
import { ICustomerRoutes } from "./types";
import Footer from "./components/Navbar/Footer";

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
      <Footer />
    </div>
  );
};

export default CustomerLayout;
