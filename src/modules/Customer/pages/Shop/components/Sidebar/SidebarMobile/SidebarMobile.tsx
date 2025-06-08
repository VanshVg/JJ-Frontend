import { AiOutlineClose } from "react-icons/ai";
import CategorySection from "./CategorySection";
import PriceRangeSection from "./PriceRangeSection";
import { IMobileSidebarProps } from "../../../types";

const SidebarMobile = ({
  isSidebarOpen,
  setIsSidebarOpen,
  priceRange,
  setPriceRange,
  setSelectedCategories,
}: IMobileSidebarProps) => {
  return (
    <div
      className={`h-full fixed px-6 top-0 bg-beige w-full text-primary flex flex-col justify-between transition-all duration-300 ease-in-out ${
        !isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div>
        <div className="flex justify-between mt-6">
          <h1 className="font-primary text-[20px] text-left">Filters</h1>
          <AiOutlineClose
            color="#2b2b2b"
            size={"20px"}
            className="mt-1 cursor-pointer"
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          />
        </div>
        <div className="h-[1px] bg-primary mt-3 opacity-30" />

        <CategorySection setSelectedCategories={setSelectedCategories} />
        <PriceRangeSection
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </div>
    </div>
  );
};

export default SidebarMobile;
