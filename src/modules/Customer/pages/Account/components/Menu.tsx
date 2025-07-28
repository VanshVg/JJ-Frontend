import { AiOutlineLogout, AiOutlineRight } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICustomerRoutes } from "../../../types";
import { menuItems } from "../types/constants";
import { IMenuItems } from "../types";
import Modal from "../../../../../components/Modal";
import { useDispatch } from "react-redux";
import {
  setCredentials,
  setUser,
} from "../../../../../redux/slices/auth.slice";
import { IAuthenticationRoutes } from "../../../../Authentication/types";

const Menu = () => {
  const [path, setPath] = useState<string>();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    setPath(location.pathname?.split(ICustomerRoutes.Account)[1]);
  }, [location]);

  return (
    <div className="w-full px-4 text-primary">
      {menuItems.map((element: IMenuItems) => (
        <div
          className="w-full mb-10 lg:border-[1px] lg:rounded-md lg:border-gray-300 lg:py-4 "
          key={element.title}
        >
          <h1 className="text-left text-[18px] font-semibold font-primary pl-4">
            {element.title}
          </h1>
          {element.items.map((item) => (
            <div
              className={`rounded-lg bg-primary mt-2 p-2 flex justify-between items-center cursor-pointer text-white lg:rounded-none lg:bg-white lg:text-primary ${
                path === "/" + item.path
                  ? "lg:border-l-[3px] lg:border-primary lg:bg-gradient-to-r lg:from-white lg:via-gray lg:to-primary"
                  : ""
              }`}
              key={item.path}
              onClick={() =>
                navigate(ICustomerRoutes.Account + "/" + item.path)
              }
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
      <div className="w-full mt-10 lg:border-[1px] lg:rounded-md lg:border-gray-300 lg:py-4 mb-4">
        <h1 className="text-left text-[18px] font-semibold font-primary pl-4">
          Others
        </h1>
        <div
          className={`rounded-lg bg-primary mt-2 p-2 flex justify-between items-center text-white lg:rounded-none lg:bg-white lg:text-primary cursor-pointer`}
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <div className="flex gap-2 items-center">
            <AiOutlineLogout />
            <p className="font-secondary">Logout</p>
          </div>
          <AiOutlineRight className="lg:hidden" />
        </div>
      </div>
      <Modal
        title="Logout"
        isOpen={isLogoutModalOpen}
        closeModal={closeLogoutModal}
        confirmModal={() => {
          dispatch(setCredentials({ token: null }));
          dispatch(
            setUser({
              userData: null,
            })
          );
          navigate(IAuthenticationRoutes.Login);
        }}
        buttonsText={{ confirm: "Logout", cancel: "Cancel" }}
      >
        <p className="text-primary mt-2 text-center">
          Are you sure you want to logout?
        </p>
      </Modal>
    </div>
  );
};

export default Menu;
