import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Checkbox from "../../../../../../../components/form-fields/Checkbox";
import { categories } from "../../../types/constants";
import { useState } from "react";
import { IFiltersProps } from "../../../types";

const CategorySection = ({ filters, setFilters }: IFiltersProps) => {
  const [isSectionOpen, setIsSectionOpen] = useState<boolean>(true);

  return (
    <div>
      <div className="flex justify-between mt-3">
        <h1 className="font-primary text-[16px] text-left">Category (5)</h1>
        {!isSectionOpen ? (
          <AiOutlinePlus
            size={"22px"}
            className="cursor-pointer"
            onClick={() => setIsSectionOpen(!isSectionOpen)}
          />
        ) : (
          <AiOutlineMinus
            size={"22px"}
            className="cursor-pointer"
            onClick={() => setIsSectionOpen(!isSectionOpen)}
          />
        )}
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isSectionOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
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
      <div className="h-[1px] bg-primary mt-5 opacity-30" />
    </div>
  );
};

export default CategorySection;
