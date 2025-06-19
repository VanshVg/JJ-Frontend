import Checkbox from "../../../../../../../components/form-fields/Checkbox";
import { IFiltersProps } from "../../../types";
import { categories } from "../../../types/constants";

const CategorySection = ({ filters, setFilters }: IFiltersProps) => {
  return (
    <div>
      <h1 className="font-primary text-left text-primary text-[18px]">
        Category (5)
      </h1>
      <div className="h-[1px] bg-primary mt-3 opacity-30" />
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden`}
      >
        {categories.map((category) => (
          <div className="w-full flex mt-4 ml-1" key={category.value}>
            <Checkbox
              name="category"
              value={category.value}
              label={category.label}
              onChange={(e) => {
                setFilters((prev) => {
                  if (e?.target?.checked) {
                    return {
                      priceRange: prev.priceRange,
                      categories: [...prev.categories, e?.target?.value],
                    };
                  } else {
                    return {
                      priceRange: prev.priceRange,
                      categories: prev.categories.filter(
                        (item) => item !== e?.target?.value
                      ),
                    };
                  }
                });
              }}
              isChecked={filters?.categories?.includes(category.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
