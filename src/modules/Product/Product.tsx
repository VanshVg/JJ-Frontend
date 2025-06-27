import { useEffect, useState } from "react";
import ProductImages from "./components/ProductImages";
import { useFetchProductByIdApi } from "./services";
import { useParams } from "react-router-dom";
import { ResponseType } from "../../types";
import { IProductDetails } from "./types";
import Rating from "@mui/material/Rating";
import { rupeesSymbol } from "../../types/constants";
import Quantity from "../../components/Quantity";
import Button from "../../components/Button";
import { ButtonDisplayType } from "../../components/types";
import ProductDetails from "./components/ProductDetails/ProductDetails";

const Product = () => {
  const [productDetails, setProductDetails] = useState<
    IProductDetails | undefined
  >();
  const [quantity, setQuantity] = useState<number>(1);

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
            <h1 className="font-primary text-[28px] text-left mt-2">
              {productDetails?.name}
            </h1>
            <h1 className="text-[14px] -mt-2 text-left opacity-80">
              By {productDetails?.brand}
            </h1>
            <div className="flex justify-start gap-1 mt-2">
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
            <div className="h-[1px] bg-primary mt-4 opacity-30" />
            <div className="flex justify-start mt-3 gap-4">
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
            {productDetails && productDetails.available_quantity > 0 ? (
              <div className="mt-4">
                <div className="flex justify-start gap-2">
                  <h2 className="text-[15px] mt-1">Quantity</h2>
                  <Quantity
                    quantity={quantity}
                    setQuantity={setQuantity}
                    availableQuantity={
                      productDetails?.available_quantity as number
                    }
                  />
                </div>
                <div className="flex justify-center mt-7 gap-4">
                  <Button
                    label="Add to cart"
                    type="button"
                    displayType={ButtonDisplayType.Primary}
                    externalClasses="p-2 w-[130px] text-center justify-center text-[17px] font-normal"
                  />
                  <Button
                    label="Buy now"
                    type="button"
                    displayType={ButtonDisplayType.Secondary}
                    externalClasses="p-2 w-[130px] text-center justify-center text-[17px] font-normal"
                  />
                </div>
              </div>
            ) : (
              <p className="text-red-600 text-[23px] text-left mt-4">
                Sold Out
              </p>
            )}
            <div className="h-[1px] bg-primary mt-6 opacity-30" />
            <ProductDetails productDetails={productDetails} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
