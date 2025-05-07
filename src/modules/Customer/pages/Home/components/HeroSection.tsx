import { useNavigate } from "react-router-dom";
import Button from "../../../../../components/Button";
import { ButtonDisplayType } from "../../../../../types";
import { ICustomerRoutes } from "../../../types";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="p-3 text-primary uppercase">
      <div className="relative">
        <div className="absolute text-[17px] font-semibold top-[25%] left-[5%] sm:text-[23px] sm:top-[28%] md:text-[29px] lg:text-[39px] xl:text-[49px] xl:left-[8%]">
          <h1 className="font-primary">Everyday Essentials,</h1>
          <h1 className="font-primary">Made Shopping Easy.</h1>
          <Button
            label="Shop Now"
            displayType={ButtonDisplayType.Primary}
            externalClasses="text-[12px] mx-auto py-2 px-4 mt-4 sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] xl:mt-8"
            onClickHandler={() => navigate(ICustomerRoutes.Shop)}
          />
        </div>
        <img src="/images/heroSectionBG.jpg"></img>
      </div>
    </div>
  );
};

export default HeroSection;
