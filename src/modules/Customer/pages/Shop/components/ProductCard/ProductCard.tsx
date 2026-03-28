import Rating from "@mui/material/Rating";
import { rupeesSymbol } from "../../../../../../types/constants";
import { IProductCardProps } from "../../types";
import { useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../../../../../../redux/slices/auth.slice";
import { getCart, updateCart } from "../../../../../../redux/slices/cart.slice";
import { useAddToCartApi } from "../../../Cart/services";
import { ToastShow } from "../../../../../../redux/slices/toast.slice";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";

const ProductCard = ({ product }: IProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuth);
  const { cartData } = useSelector(getCart);
  const { addToCartApi, isLoading: cartLoading } = useAddToCartApi();

  const cartItem = cartData.find((item) => item.product.id === product.id);
  const cartQuantity = cartItem?.quantity ?? 0;
  const isInCart = cartQuantity > 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      dispatch(
        updateCart({
          product: {
            id: product.id,
            name: product.name,
            selling_price: product.selling_price,
            available_quantity: product.available_quantity,
            productImages: product.productImages?.length
              ? [{ image_url: product.productImages[0].image_url }]
              : [],
          },
          quantity: 1,
          is_selected: true,
        })
      );
      dispatch(ToastShow({ message: "Product added to cart successfully", type: "success" }));
    } else {
      await addToCartApi(product.id, 1);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // For guest: decrement via updateCart with quantity -1 isn't supported,
    // so navigate to cart for quantity management below 1
    navigate(ICustomerRoutes.Cart);
  };

  return (
    <div
      className={`w-[90%] mx-auto p-3 sm:w-[50%] sm:mx-0 md:w-[33%] lg:w-[33%]`}
      onClick={() => navigate(ICustomerRoutes.Product + `/${product.id}`)}
    >
      <div className="border-primary border-[1px] h-[370px] lg:h-[400px] group relative overflow-hidden cursor-pointer">
        <div className="h-[250px] lg:h-[270px] bg-gray relative">
          <img
            src={product?.productImages?.[0]?.image_url}
            className="h-[150px] lg:h-[170px] mx-auto absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-100 group-hover:opacity-0"
          />
          <img
            src={product?.productImages?.[1]?.image_url}
            className="h-[150px] lg:h-[170px] mx-auto absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          />
          {product.discount && product.discount > 0 && (
            <div className="bg-primary p-1 absolute min-w-[100px] rounded-[1px] top-1 left-1">
              <h2 className="text-white text-[14px]">
                {product.discount + "% OFF"}
              </h2>
            </div>
          )}
          {/* Add to Cart overlay — visible on hover */}
          <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isInCart ? (
              <div
                className="bg-primary flex items-center justify-between px-4 py-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleRemove}
                  className="text-white cursor-pointer"
                >
                  <AiFillMinusSquare className="text-[22px]" />
                </button>
                <span className="text-white text-[14px] font-semibold">
                  {cartQuantity} in cart
                </span>
                <button
                  onClick={handleAdd}
                  disabled={cartLoading || cartQuantity >= product.available_quantity}
                  className="text-white cursor-pointer disabled:opacity-40"
                >
                  <AiFillPlusSquare className="text-[22px]" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                disabled={cartLoading || product.available_quantity === 0}
                className="w-full bg-primary text-white text-[14px] py-2 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                {product.available_quantity === 0
                  ? "Out of Stock"
                  : cartLoading
                  ? "Adding..."
                  : "+ Add to Cart"}
              </button>
            )}
          </div>
        </div>
        <div className="h-[120px] lg:h-[130px] bg-primary text-white text-[17px] md:text-[18px] lg:text-[20px] pt-3 lg:pt-5 text-center">
          <h2 className="group-hover:underline inline text-[18px]">
            {product.name}
          </h2>
          <div className="flex justify-center gap-2">
            <p className="text-[16px] mt-1">
              {product.selling_price + rupeesSymbol}
            </p>
            {product.selling_price && product.selling_price < product.MRP && (
              <p className="text-[16px] mt-1 opacity-60 line-through">
                {product.MRP + rupeesSymbol}
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
                readOnly
                sx={{ "& .MuiRating-iconEmpty": { color: "#888" } }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
