import Rating from "@mui/material/Rating";
import { rupeesSymbol } from "../../../../../../types/constants";
import { IProductCardProps } from "../../types";

const ProductCard = ({ product }: IProductCardProps) => {
  return (
    <div className={`w-[90%] mx-auto p-3 md:w-[33%] lg:w-[25%]`}>
      <div className="border-primary border-[1px] min-h-[350px] lg:min-h-[350px] group relative overflow-hidden cursor-pointer">
        <div className="min-h-[230px] lg:min-h-[250px] bg-gray relative">
          <img
            src={product?.productImages?.[0]?.image_url}
            className="h-[150px] lg:h-[160px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-100 group-hover:opacity-0"
          />
          <img
            src={product?.productImages?.[1]?.image_url}
            className="h-[150px] lg:h-[160px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          />
        </div>
        <div className="min-h-[120px] lg:min-h-[100px] bg-primary text-white text-[17px] md:text-[18px] lg:text-[20px] pt-3 lg:pt-8 text-center">
          <h2 className="group-hover:underline inline text-[18px]">
            {product.name}
          </h2>
          <div className="flex justify-center gap-2">
            <p className="text-[16px] mt-1">{product.MRP + rupeesSymbol}</p>
            <p className="text-[16px] mt-1 opacity-60 line-through">
              {product.MRP + rupeesSymbol}
            </p>
          </div>
          <div className="mt-2">
            <Rating
              name="simple-controlled"
              value={4.25}
              precision={0.25}
              size="small"
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
              readOnly
              sx={{
                "& .MuiRating-iconEmpty": {
                  color: "#888",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
