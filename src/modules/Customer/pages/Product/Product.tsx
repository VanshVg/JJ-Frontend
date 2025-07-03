import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchProductByIdApi } from "./services";
import { ResponseType } from "../../../../types";
import { IProductDetails } from "./types";
import ProductImages from "./components/ProductImages";
import { rupeesSymbol } from "../../../../types/constants";

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !productDetails) {
    return <p className="text-red-600">Something Went Wrong...</p>;
  }

  console.log(productDetails);

  return (
    <div className="text-primary">
      <div>
        <ProductImages
          productImages={productDetails.productImages}
          discount={productDetails.discount}
        />
      </div>
      <div className="max-w-[90%] mx-auto">
        <div className="h-[1px] bg-primary w-full opacity-50" />
        <div className="mt-[20px]">
          <h1 className="text-[20px] font-semibold text-left">
            {productDetails.name}
          </h1>
          <div className="flex justify-start mt-[15px] gap-4">
            <p className="text-[22px]">
              {rupeesSymbol}
              {productDetails.selling_price}
            </p>
            {productDetails.discount && productDetails.discount > 0 && (
              <>
                <p className="text-[16px] line-through opacity-50 mt-1">
                  MRP
                  {rupeesSymbol}
                  {productDetails.MRP}
                </p>
                <div className="border-[1px] border-gray-300 px-3 flex items-center">
                  <p className="text-[12px]">{productDetails.discount}% OFF</p>
                </div>
              </>
            )}
          </div>
          <div className="h-[1px] bg-primary w-full opacity-50 mt-[20px]" />
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Product;
