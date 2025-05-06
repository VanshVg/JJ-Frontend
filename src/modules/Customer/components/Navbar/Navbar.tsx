import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import {
  navMenuCornerElements,
  navMenuMiddleElements,
} from "../../types/constants";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const path = useLocation().pathname;

  return (
    <nav className="text-primary font-secondary">
      <div className="p-4 border-t-[1px] border-b-[1px] border-primary flex justify-between">
        <div className="md:mt-3 md:w-[200px]">Search...</div>
        <div className="md:flex hidden md:box gap-4 mt-3 text-[18px] font-[]">
          {navMenuMiddleElements.map((element, index) => {
            return (
              <div
                className={`pr-4 max-h-[25px] ${
                  index !== navMenuMiddleElements.length - 1 && "border-r-[1px]"
                }`}
                key={element.label}
              >
                <h2
                  key={element.label}
                  className={`text-center cursor-pointer mx-auto ease-in duration-100 hover:text-light-gray ${
                    path === element.path && "text-light-gray"
                  }`}
                  onClick={() => navigate(element.path)}
                >
                  {element.label}
                </h2>
              </div>
            );
          })}
        </div>
        <div className="md:flex hidden md:box gap-6 text-[18px] mt-3">
          {navMenuCornerElements.map((element) => {
            return (
              <div
                className="flex gap-2 max-h-[25px] cursor-pointer"
                key={element.label}
                onClick={() => navigate(element.path)}
              >
                <element.icon className="mt-[3px] text-[20px]" />
                <h2
                  className={`text-center ease-in duration-100 hover:text-light-gray ${
                    path === element.path && "text-light-gray"
                  }`}
                >
                  {element.label}
                </h2>
              </div>
            );
          })}
        </div>
        <div className="md:hidden">
          <AiOutlineMenu
            color="#2b2b2b"
            size={"25px"}
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      </div>
      <div
        className={`md:hidden w-full h-full bg-[#fafafa] fixed top-0 transition-opacity duration-500 ${
          !isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <AiOutlineClose
          color="#2b2b2b"
          size={"25px"}
          className="absolute right-4 top-14"
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <div className="mt-28 text-[18px]">
          {[...navMenuMiddleElements, ...navMenuCornerElements].map(
            (element) => {
              return (
                <div
                  className="mt-5 border-b-[1px] max-w-[250px] mx-auto"
                  key={element.label}
                >
                  <h2
                    className={`text-center mx-auto pb-2 ${
                      path === element.path && "text-light-gray"
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(element.path);
                    }}
                  >
                    {element.label}
                  </h2>
                </div>
              );
            }
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
