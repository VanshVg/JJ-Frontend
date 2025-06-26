import { useEffect, useState } from "react";
import ProductImages from "./components/ProductImages";
import { useFetchProductByIdApi } from "./services";
import { useParams } from "react-router-dom";
import { ResponseType } from "../../types";
import { IProductDetails } from "./types";
import Rating from "@mui/material/Rating";
import { AiFillCaretDown } from "react-icons/ai";
import { rupeesSymbol } from "../../types/constants";

const Product = () => {
  const [productDetails, setProductDetails] = useState<
    IProductDetails | undefined
  >();

  const productId = useParams()?.id;

  const { fetchProductByIdApi, isLoading, isError } = useFetchProductByIdApi();

  const fetchProductById = async () => {
    const { data } = await fetchProductByIdApi(Number(productId));

    if (data?.data && data?.responseType === ResponseType.Success) {
      setProductDetails(data.data);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [productId]);

  return (
    <div className="text-primary">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-600">Something Went Wrong</p>
      ) : (
        <div className="p-4">
          <ProductImages
            productImages={productDetails?.productImages}
            discount={productDetails?.discount}
          />
          <div>
            <h1 className="font-primary text-[28px] mt-2 text-left">
              {productDetails?.name}
            </h1>
            <div className="flex justify-start gap-1">
              <Rating
                name="simple-controlled"
                value={Number(productDetails?.average_rating) || 0}
                precision={0.25}
                size="small"
                readOnly
              />
              <p className="-mt-[1px] text-[13px]">
                ({productDetails?.average_rating})
              </p>
            </div>
            <div className="flex justify-start mt-2 gap-4">
              {productDetails?.discount && (
                <div className="flex justify-start gap-4">
                  <h2 className="line-through text-[22px] opacity-70 mt-1">
                    {productDetails?.MRP}
                    {rupeesSymbol}
                  </h2>
                </div>
              )}
              <h2 className="text-[28px]">
                {productDetails?.selling_price}
                {rupeesSymbol}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
