import Rating from "@mui/material/Rating";
import { rupeesSymbol } from "../../../../../../types/constants";
import { IProductCardProps } from "../../types";

const ProductCard = ({ product }: IProductCardProps) => {
  return (
    <div className={`w-[90%] mx-auto p-3 md:w-[33%] lg:w-[25%]`}>
      <div className="border-primary border-[1px] min-h-[370px] lg:min-h-[350px] group relative overflow-hidden cursor-pointer">
        <div className="min-h-[250px] lg:min-h-[250px] bg-gray relative">
          <img
            src={product?.productImages?.[0]?.image_url}
            className="h-[150px] lg:h-[160px] mx-auto absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-100 group-hover:opacity-0"
          />
          <img
            src={product?.productImages?.[1]?.image_url}
            className="h-[150px] lg:h-[160px] mx-auto absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          />
          {product.discount && product.discount > 0 && (
            <div className="bg-primary p-1 absolute min-w-[100px] rounded-[1px] top-1 left-1">
              <h2 className="text-white text-[14px]">
                {product.discount + "% OFF"}
              </h2>
            </div>
          )}
        </div>
        <div className="min-h-[120px] lg:min-h-[100px] bg-primary text-white text-[17px] md:text-[18px] lg:text-[20px] pt-3 lg:pt-8 text-center">
          <h2 className="group-hover:underline inline text-[18px]">
            {product.name}
          </h2>
          <div className="flex justify-center gap-2">
            <p className="text-[16px] mt-1">{product.MRP + rupeesSymbol}</p>
            {product.selling_price && product.selling_price < product.MRP && (
              <p className="text-[16px] mt-1 opacity-60 line-through">
                {product.selling_price + rupeesSymbol}
              </p>
            )}
          </div>
          {product.average_rating && (
            <div className="mt-2">
              <Rating
                name="simple-controlled"
                value={Number(product.average_rating) || 0}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
