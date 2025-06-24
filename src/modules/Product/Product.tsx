import { useEffect, useState } from "react";
import ProductImages from "./components/ProductImages";
import { useFetchProductByIdApi } from "./services";
import { useParams } from "react-router-dom";
import { ResponseType } from "../../types";
import { IProductDetails } from "./types";

const Product = () => {
  const [productDetails, setProductDetails] = useState<
    IProductDetails | undefined
  >();

  const productId = useParams()?.id;

  const { fetchProductByIdApi, isLoading, isError } = useFetchProductByIdApi();

  const fetchProductById = async () => {
    const { data } = await fetchProductByIdApi(Number(productId));
    console.log(data.data);
    if (data?.data && data?.responseType === ResponseType.Success) {
      setProductDetails(data.data);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [productId]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-600">Something Went Wrong</p>
      ) : (
        <div>
          <ProductImages productImages={productDetails?.productImages} />
        </div>
      )}
    </div>
  );
};

export default Product;
