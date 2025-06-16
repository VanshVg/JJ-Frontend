import { IMainSidebarProps } from "../../../types";
import CategorySection from "./CategorySection";
import PriceRangeSection from "./PriceRangeSection";

const MainSidebar = ({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
}: IMainSidebarProps) => {
  return (
    <div className="h-screen w-[22%] px-8 py-5 hidden z-10 lg:block overflow-y-auto">
      <CategorySection
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
      />
      <PriceRangeSection
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      <p
        className="underline font-secondary text-center cursor-pointer text-primary mt-10"
        onClick={() => {
          setPriceRange([50, 2500]);
          setSelectedCategories([]);
        }}
      >
        Clear Filters
      </p>
    </div>
  );
};

export default MainSidebar;
