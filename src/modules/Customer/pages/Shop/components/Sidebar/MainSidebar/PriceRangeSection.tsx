import { rupeesSymbol } from "../../../../../../../types/constants";
import Slider from "@mui/material/Slider";
import { IFiltersProps } from "../../../types";

const PriceRangeSection = ({ filters, setFilters }: IFiltersProps) => {
  const priceRangeHandler = (event: Event, newValue: number[]) => {
    if (newValue[1] - newValue[0] < 20) {
      return;
    }
    setFilters((prev) => {
      return {
        categories: prev.categories,
        priceRange: newValue,
      };
    });
  };

  return (
    <div className="mt-10">
      <h1 className="font-primary text-left text-primary text-[18px]">
        Price Range (50{rupeesSymbol} - 2500{rupeesSymbol}){" "}
      </h1>
      <div className="h-[1px] bg-primary mt-3 opacity-30" />
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className="px-6 pt-7">
          <Slider
            getAriaLabel={() => "Price Range"}
            value={filters.priceRange}
            onChange={priceRangeHandler}
            valueLabelDisplay="off"
            max={2500}
            min={50}
            getAriaValueText={(price: number) => `${price}${rupeesSymbol}`}
            size="small"
            disableSwap
            step={5}
            sx={{
              color: "#2b2b2b",
              "& .MuiSlider-thumb": {
                backgroundColor: "#2b2b2b",
              },
              "& .MuiSlider-track": {
                backgroundColor: "#2b2b2b",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#2b2b2b",
              },
            }}
          />
        </div>
        <div className="w-full flex justify-between text-primary font-semibold px-4">
          <span>
            {filters.priceRange?.[0]}
            {rupeesSymbol}
          </span>
          <span>
            {filters.priceRange?.[1]}
            {rupeesSymbol}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSection;
