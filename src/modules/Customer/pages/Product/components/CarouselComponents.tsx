import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IArrowProps, IIndicatorsProps } from "../types";

export const PrevArrow = ({ clickHandler }: IArrowProps) => {
  return (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-transparent text-primary text-2xl cursor-pointer"
      onClick={clickHandler}
    >
      <AiOutlineArrowLeft />
    </div>
  );
};

export const NextArrow = ({ clickHandler }: IArrowProps) => {
  return (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-transparent text-primary text-2xl cursor-pointer"
      onClick={clickHandler}
    >
      <AiOutlineArrowRight />
    </div>
  );
};

export const Indicators = ({
  clickHandler,
  index,
  isSelected,
  label,
}: IIndicatorsProps) => {
  const baseClass =
    "inline-block w-2 h-2 mx-1 rounded-full cursor-pointer transition-all duration-300";
  const selectedClass = "bg-primary scale-110";
  const unselectedClass = "bg-gray-300 hover:bg-blue-400";

  return (
    <li
      key={index}
      className={`${baseClass} ${isSelected ? selectedClass : unselectedClass}`}
      onClick={clickHandler}
      onKeyDown={clickHandler}
      value={index}
      role="button"
      tabIndex={0}
      aria-label={`${label} ${index + 1}`}
    />
  );
};
