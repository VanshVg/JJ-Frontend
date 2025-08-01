import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchProductByIdApi } from "./services";
import { ResponseType } from "../../../../types";
import { IProductDetails } from "./types";
import ProductImages from "./components/ProductImages";
import { rupeesSymbol } from "../../../../types/constants";
import { format } from "date-fns";
import Quantity from "../../../../components/Quantity";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../components/types";
import Footer from "../../components/Footer";
import { getAuth } from "../../../../redux/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../../redux/slices/cart.slice";
import { ToastShow } from "../../../../redux/slices/toast.slice";
import { useAddToCartApi } from "../Cart/services";

const Product = () => {
  const [productDetails, setProductDetails] = useState<
    IProductDetails | undefined
  >();
  const [quantity, setQuantity] = useState<number>(1);

  const productId = useParams()?.id;

  const { isAuthenticated } = useSelector(getAuth);
  const dispatch = useDispatch();

  const { fetchProductByIdApi, isLoading, isError } = useFetchProductByIdApi();
  const { addToCartApi, isLoading: cartLoading } = useAddToCartApi();

  const fetchProductById = async () => {
    const { data } = await fetchProductByIdApi(Number(productId));

    if (data?.data && data?.responseType === ResponseType.Success) {
      setProductDetails(data.data);
    }
  };

  const addProductToCart = async () => {
    if (!isAuthenticated && productDetails) {
      dispatch(
        updateCart({
          product: {
            id: Number(productId),
            brand: productDetails.brand,
            name: productDetails.name,
            selling_price: productDetails.selling_price,
            available_quantity: productDetails.available_quantity,
          },
          quantity,
        })
      );
      dispatch(
        ToastShow({
          message: "Product added to cart successfully",
          type: "success",
        })
      );
    } else {
      await addToCartApi(Number(productId), quantity);
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
      <div className="lg:flex lg:gap-8 lg:p-3">
        <div className="lg:w-[45%]">
          <ProductImages
            productImages={productDetails.productImages}
            discount={productDetails.discount}
          />
        </div>
        <div className="max-w-[90%] mx-auto lg:w-[50%] ">
          <div className="h-[1px] bg-primary w-full opacity-50 lg:hidden" />
          <div className="mt-[20px] lg:mt-0">
            <h1 className="text-[20px] font-semibold text-left font-secondary">
              {productDetails.name}
            </h1>
            <div className="font-secondary">
              <div className="flex justify-start mt-[15px] gap-4">
                <p className="text-[22px]">
                  {rupeesSymbol}
                  {"  " + productDetails.selling_price}
                </p>
                {productDetails.discount && productDetails.discount > 0 && (
                  <>
                    <p className="text-[16px] line-through opacity-50 mt-1">
                      MRP
                      {" " + rupeesSymbol}
                      {productDetails.MRP}
                    </p>
                    <div className="border-[1px] border-gray-300 px-2 flex items-center">
                      <p className="text-[12px]">SALE</p>
                    </div>
                  </>
                )}
              </div>
              <p className="mt-[15px]  opacity-80 text-left text-[15px]">
                (Incl. of All Taxes)
              </p>
            </div>
            <div className="h-[1px] bg-primary w-full opacity-50 mt-[20px]" />
            <div className="text-[15px] opacity-90 font-primary">
              <div className="mt-[15px] flex justify-start gap-4">
                <p className="font-semibold">Brand:</p>
                <p>{productDetails.brand}</p>
              </div>
              <div className="h-[1px] bg-primary w-full opacity-50 mt-[15px]" />
              <div className="mt-[15px] flex justify-start gap-4">
                <p className="font-semibold">Category:</p>
                <p>{productDetails.category.name}</p>
              </div>
              <div className="h-[1px] bg-primary w-full opacity-50 mt-[15px]" />
              <div className="mt-[15px] flex justify-start gap-4">
                <p className="font-semibold">Weight:</p>
                <p>
                  {productDetails.weight} {productDetails.weight_unit}
                </p>
              </div>
              <div className="h-[1px] bg-primary w-full opacity-50 mt-[15px]" />
              <div className="mt-[15px] flex justify-start gap-4">
                <p className="font-semibold">Packaging Date:</p>
                <p>{format(productDetails.packaging_date, "dd/MM/yyyy")}</p>
              </div>
              <div className="h-[1px] bg-primary w-full opacity-50 mt-[15px]" />
              <div className="mt-[15px] flex justify-start gap-4">
                <p className="font-semibold">Expiry Date:</p>
                <p>{format(productDetails.expiry_date, "dd/MM/yyyy")}</p>
              </div>
              <div className="h-[1px] bg-primary w-full opacity-50 mt-[15px]" />
            </div>
            <div className="mt-[15px]">
              <Quantity
                quantity={quantity}
                setQuantity={setQuantity}
                availableQuantity={productDetails.available_quantity}
              />
            </div>
            <div className="w-full flex flex-col justify-center mt-[30px] gap-3">
              <Button
                label="ADD TO CART"
                displayType={ButtonDisplayType.Secondary}
                externalClasses="justify-center text-[13px] py-[12px] px-[20px] rounded-sm w-full font-primary"
                onClickHandler={addProductToCart}
                isDisabled={cartLoading}
                isLoading={cartLoading}
              />
              <Button
                label="BUY NOW"
                displayType={ButtonDisplayType.Primary}
                externalClasses="justify-center text-[13px] py-[12px] px-[20px] rounded-sm w-full font-primary"
              />
            </div>
            <p className="text-[15px] text-justify opacity-80 mt-[25px] font-primary">
              {productDetails.description}
            </p>
            <div className="h-[1px] bg-primary w-full opacity-50 mt-[25px]" />
            {/* <div className="mt-[50px]">
              <ProductReviews
                rating={productDetails.average_rating}
                reviews={productDetails.productReviews}
              />
            </div> */}
          </div>
        </div>
      </div>
      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default Product;
