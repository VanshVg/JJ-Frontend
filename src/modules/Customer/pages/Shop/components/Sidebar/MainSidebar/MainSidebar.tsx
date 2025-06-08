import { IMainSidebarProps } from "../../../types";
import CategorySection from "./CategorySection";
import PriceRangeSection from "./PriceRangeSection";

const MainSidebar = ({
  priceRange,
  setPriceRange,
  setSelectedCategories,
}: IMainSidebarProps) => {
  return (
    <div className="h-screen w-[22%] px-8 py-5">
      <CategorySection setSelectedCategories={setSelectedCategories} />
      <PriceRangeSection
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
    </div>
  );
};

export default MainSidebar;
