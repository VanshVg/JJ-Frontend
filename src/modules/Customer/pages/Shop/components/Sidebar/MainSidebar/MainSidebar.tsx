import { IMainSidebarProps } from "../../../types";
import CategorySection from "./CategorySection";
import PriceRangeSection from "./PriceRangeSection";

const MainSidebar = ({ filters, setFilters }: IMainSidebarProps) => {
  return (
    <div className="h-screen w-[22%] px-8 py-5 hidden z-10 lg:block overflow-y-auto">
      <CategorySection filters={filters} setFilters={setFilters} />
      <PriceRangeSection filters={filters} setFilters={setFilters} />
      <p
        className="underline font-secondary text-center cursor-pointer text-primary mt-10"
        onClick={() => {
          setFilters({
            priceRange: [50, 2500],
            categories: [],
          });
        }}
      >
        Clear Filters
      </p>
    </div>
  );
};

export default MainSidebar;
