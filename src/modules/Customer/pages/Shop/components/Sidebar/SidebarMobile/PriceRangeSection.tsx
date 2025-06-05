import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { rupeesSymbol } from "../../../../../../../types/constants";
import Slider from "@mui/material/Slider";

const PriceRangeSection = () => {
  const [isSectionOpen, setIsSectionOpen] = useState<boolean>(true);

  const [priceRange, setPriceRange] = useState<number[]>([50, 2500]);

  const priceRangeHandler = (event: Event, newValue: number[]) => {
    if (newValue[1] - newValue[0] < 20) {
      return;
    }
    setPriceRange(newValue);
  };

  return (
    <div>
      <div className="flex justify-between mt-3">
        <h1 className="font-primary text-[16px] text-left">
          Price Range (50{rupeesSymbol} - 2500{rupeesSymbol}){" "}
        </h1>
        {!isSectionOpen ? (
          <AiOutlinePlus
            size={"22px"}
            onClick={() => setIsSectionOpen(!isSectionOpen)}
          />
        ) : (
          <AiOutlineMinus
            size={"22px"}
            onClick={() => setIsSectionOpen(!isSectionOpen)}
          />
        )}
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden px-6 pt-7 ${
          isSectionOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Slider
          getAriaLabel={() => "Price Range"}
          value={priceRange}
          onChange={priceRangeHandler}
          valueLabelDisplay="auto"
          getAriaValueText={(price: number) => `${price}${rupeesSymbol}`}
          size="small"
          disableSwap
          step={5}
          min={20}
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
    </div>
  );
};

export default PriceRangeSection;
