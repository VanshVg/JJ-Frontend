import Checkbox from "../../../../../../../components/form-fields/Checkbox";
import { ICategoryFilterProps } from "../../../types";
import { categories } from "../../../types/constants";

const CategorySection = ({ setSelectedCategories }: ICategoryFilterProps) => {
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
                setSelectedCategories((prev) => {
                  if (e?.target?.checked) {
                    return [...prev, e?.target?.value];
                  } else {
                    return prev.filter((item) => item !== e?.target?.value);
                  }
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
