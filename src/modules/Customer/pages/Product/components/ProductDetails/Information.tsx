import { IProductDetails } from "../../types";
import { format } from "date-fns";

const Information = ({
  productDetails,
  isActive,
}: {
  productDetails?: IProductDetails;
  isActive: boolean;
}) => {
  return (
    <div
      className={`text-[16px] font-primary mt-4 transition-all ease-in duration-200 absolute left-0 right-0 ${
        !isActive ? "opacity-0 pointer-events-none" : ""
      }`}
    >
      <div className="border-[1px] border-gray-300 p-3 w-full rounded-md">
        <div className="flex justify-between px-4">
          <p className="font-semibold font-primary text-[18px] w-[70%]">
            Brand
          </p>
          <p className="text-left w-[30%]">{productDetails?.brand}</p>
        </div>
        <div className="h-[1px] bg-gray mt-2" />
        <div className="flex justify-between px-4 mt-2">
          <p className="font-semibold font-primary text-[18px] w-[70%]">
            Category
          </p>
          <p className="text-left w-[30%]">{productDetails?.category?.name}</p>
        </div>
        <div className="h-[1px] bg-gray mt-2" />
        <div className="flex justify-between px-4 mt-2">
          <p className="font-semibold font-primary text-[18px] w-[70%]">
            Weight
          </p>
          <p className="text-left w-[30%]">
            {productDetails?.weight}
            {productDetails?.weight_unit}
          </p>
        </div>
        <div className="h-[1px] bg-gray mt-2" />
        {productDetails?.packaging_date && (
          <>
            <div className="flex justify-between px-4 mt-2">
              <p className="font-semibold font-primary text-[18px] w-[70%]">
                Packaging Date
              </p>
              <p className="text-left w-[30%]">
                {format(
                  new Date(productDetails?.packaging_date as Date),
                  "dd/MM/yyyy"
                )}
              </p>
            </div>
            <div className="h-[1px] bg-gray mt-2" />
          </>
        )}
        {productDetails?.expiry_date && (
          <>
            <div className="flex justify-between px-4 mt-2">
              <p className="font-semibold font-primary text-[18px] w-[70%]">
                Expiry Date
              </p>
              <p className="text-left w-[30%]">
                {format(
                  new Date(productDetails?.expiry_date as Date),
                  "dd/MM/yyyy"
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Information;
