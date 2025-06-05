import { AiOutlineClose } from "react-icons/ai";
import CategorySection from "./CategorySection";
import PriceRangeSection from "./PriceRangeSection";
import Button from "../../../../../../../components/Button";
import { ButtonDisplayType } from "../../../../../../../components/types";
import { IMobileSidebarProps } from "../../../types";

const SidebarMobile = ({
  isSidebarOpen,
  setIsSidebarOpen,
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
            className="mt-1"
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          />
        </div>
        <div className="h-[1px] bg-primary mt-3 opacity-30" />

        <CategorySection />
        <PriceRangeSection />
      </div>
      <div className="flex mb-16">
        <Button
          label="Apply"
          type="button"
          displayType={ButtonDisplayType.Primary}
          externalClasses="text-[12px] mx-auto py-3 px-4 mt-8 lg:text-[14px]"
        />
        <Button
          label="Cancel"
          type="button"
          displayType={ButtonDisplayType.Secondary}
          externalClasses="text-[12px] mx-auto py-3 px-4 mt-8 lg:text-[14px]"
          onClickHandler={() => setIsSidebarOpen(false)}
        />
      </div>
    </div>
  );
};

export default SidebarMobile;
