import { useState } from "react";
import Slider from "@mui/material/Slider";
import { rupeesSymbol } from "../../../../../../../types/constants";
import { AiOutlineClose } from "react-icons/ai";
import CategorySection from "./CategorySection";

const SidebarMobile = () => {
  const [priceRange, setPriceRange] = useState<number[]>([50, 2500]);

  const priceRangeHandler = (event: Event, newValue: number[]) => {
    setPriceRange(newValue);
  };
  return (
    <div className="h-full fixed px-6 top-0 bg-beige w-full text-primary">
      <div className="flex justify-between mt-6">
        <h1 className="font-primary text-[20px] text-left">Filters</h1>
        <AiOutlineClose
          color="#2b2b2b"
          size={"20px"}
          className="mt-1"
          // onClick={() => {
          //   setIsOpen(false);
          // }}
        />
      </div>
      <div className="h-[1px] bg-primary mt-3 opacity-30" />

      <CategorySection />

      {/* <div className="mt-12">
        <h1 className="font-primary text-[20px] mt-6">Price Range</h1>
        <div className="flex mt-1 mx-auto flex-col items-center max-w-[70%]">
          <Slider
            getAriaLabel={() => "Price Range"}
            value={priceRange}
            onChange={priceRangeHandler}
            valueLabelDisplay="auto"
            getAriaValueText={(price: number) => `${price}${rupeesSymbol}`}
            size="small"
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
      </div> */}
    </div>
  );
};

export default SidebarMobile;
