import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { getAuth } from "../../../../../redux/slices/auth.slice";
import { AiOutlineLogout, AiOutlineRight } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICustomerRoutes } from "../../../types";
import { menuItems } from "../types/constants";
import { IMenuItems } from "../types";

const Menu = () => {
  const { userData } = useSelector(getAuth);
  const [path, setPath] = useState<string>();

  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname?.split(ICustomerRoutes.Account)[1]);
  }, [location]);

  return (
    <div className="w-full px-4 text-primary">
      <div className="flex justify-center gap-4 items-center lg:justify-start">
        <div>
          <VscAccount className="text-[70px] opacity-90 text-primary" />
        </div>

        <div className="text-left text-[13px] flex flex-col justify-center gap-1">
          <p className="opacity-100 font-semibold text-[15px]">
            {userData?.firstname} {userData?.lastname}
          </p>
          <p className="opacity-80 ">+91{userData?.contact_no}</p>
        </div>
      </div>
      {menuItems.map((element: IMenuItems) => (
        <div
          className="w-full mt-10 lg:border-[1px] lg:rounded-md lg:border-gray-300 lg:py-4"
          key={element.title}
        >
          <h1 className="text-left text-[18px] font-semibold font-primary pl-4">
            {element.title}
          </h1>
          {element.items.map((item) => (
            <div
              className={`rounded-lg bg-primary mt-2 p-2 flex justify-between items-center text-white lg:rounded-none lg:bg-white lg:text-primary ${
                path === "/" + item.path
                  ? "lg:border-l-[3px] lg:border-primary"
                  : ""
              }`}
            >
              <div className="flex gap-2 items-center">
                <item.icon />
                <p className="font-secondary">{item.title}</p>
              </div>
              <AiOutlineRight className="lg:hidden" />
            </div>
          ))}
        </div>
      ))}
      <div className="w-full mt-10 lg:border-[1px] lg:rounded-md lg:border-gray-300 lg:py-4">
        <h1 className="text-left text-[18px] font-semibold font-primary pl-4">
          Others
        </h1>
        <div
          className={`rounded-lg bg-primary mt-2 p-2 flex justify-between items-center text-white lg:rounded-none lg:bg-white lg:text-primary`}
        >
          <div className="flex gap-2 items-center">
            <AiOutlineLogout />
            <p className="font-secondary">Logout</p>
          </div>
          <AiOutlineRight className="lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
