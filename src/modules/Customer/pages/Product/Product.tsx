import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchProductByIdApi } from "./services";
import { ResponseType } from "../../../../types";
import { IProductDetails } from "./types";
import ProductImages from "./components/ProductImages";

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

  return (
    <div className="text-primary">
      <div>
        <ProductImages
          productImages={productDetails.productImages}
          discount={productDetails.discount}
        />
      </div>
      <div></div>
    </div>
  );
};

export default Product;
