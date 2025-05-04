import { useState } from "react";
import { logoPath } from "../../../../types/constants";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { navMenuElements } from "../../types/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="p-4 flex justify-between">
        <div>
          <img
            src={logoPath}
            className="h-[130px] w-[130px] md:h-[150px] md:w-[150px] cursor-pointer"
          />
        </div>
        <div></div>
        <div>
          <div className="md:hidden mt-10 ">
            <AiOutlineMenu
              color="#ff5715"
              size={"25px"}
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`md:hidden w-full h-full bg-white fixed top-0 transition-opacity duration-500 ${
          !isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <AiOutlineClose
          color="#ff5715"
          size={"25px"}
          className="absolute right-4 top-14"
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <div className="mt-28 text-[#ff5715] text-[18px]">
          {navMenuElements.map((element) => {
            return (
              <h2
                key={element.label}
                className="text-center mt-5 border-b-[1px] max-w-[250px] mx-auto pb-2"
              >
                {element.label}
              </h2>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
