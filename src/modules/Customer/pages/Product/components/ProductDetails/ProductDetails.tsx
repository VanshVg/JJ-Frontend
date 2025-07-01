import { useState } from "react";
import { IProductDetails, ProductDetailsTabs } from "../../types";
import Description from "./Description";
import Information from "./Information";
import Reviews from "./Reviews";

const ProductDetails = ({
  productDetails,
}: {
  productDetails?: IProductDetails;
}) => {
  const [active, setActive] = useState<ProductDetailsTabs>(
    ProductDetailsTabs.Reviews
  );

  return (
    <div className="text-left">
      <h1 className="mt-2 text-[24px] font-primary">Product Details</h1>
      <div className="bg-gray w-full flex gap-2 justify-between p-1 mt-2 rounded-md">
        <div
          className={`text-primary opacity-70 p-2 rounded-md px-6 font-semibold cursor-pointer transition-all ease-in duration-200 ${
            active === ProductDetailsTabs.Reviews
              ? "bg-white opacity-100 font-semibold"
              : ""
          }`}
          onClick={() => setActive(ProductDetailsTabs.Reviews)}
        >
          Reviews
        </div>
        <div
          className={`text-primary opacity-70 p-2 rounded-md px-6 font-semibold cursor-pointer transition-all ease-in duration-200 ${
            active === ProductDetailsTabs.Description
              ? "bg-white opacity-100"
              : ""
          }`}
          onClick={() => setActive(ProductDetailsTabs.Description)}
        >
          Description
        </div>
        <div
          className={`text-primary opacity-70 p-2 rounded-md px-6 font-semibold cursor-pointer transition-all ease-in duration-200 ${
            active === ProductDetailsTabs.Information
              ? "bg-white opacity-100 font-semibold"
              : ""
          }`}
          onClick={() => setActive(ProductDetailsTabs.Information)}
        >
          Information
        </div>
      </div>
      <div className="relative">
        <Reviews
          productDetails={productDetails}
          isActive={active === ProductDetailsTabs.Reviews}
        />
        <Description
          productDetails={productDetails}
          isActive={active === ProductDetailsTabs.Description}
        />
        <Information
          productDetails={productDetails}
          isActive={active === ProductDetailsTabs.Information}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
