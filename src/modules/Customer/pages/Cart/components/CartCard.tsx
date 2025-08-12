import { useEffect, useState } from "react";
import Checkbox from "../../../../../components/form-fields/Checkbox";
import { ICart } from "../../../../../types";
import Quantity from "../../../../../components/Quantity";
import { AiOutlineClose } from "react-icons/ai";
import { rupeesSymbol } from "../../../../../types/constants";
import { useRemoveFromCartApi, useUpdateCartApi } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../../../../../redux/slices/auth.slice";
import {
  removeProductFromCart,
  updateCartData,
} from "../../../../../redux/slices/cart.slice";
import { useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../../../types";

const CartCard = ({
  item,
  isAllSelected,
  setIsItemUpdated,
  setIsAllSelected,
  setCartProducts,
}: {
  item: ICart;
  isAllSelected?: boolean;
  setIsItemUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAllSelected: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setCartProducts: React.Dispatch<React.SetStateAction<ICart[]>>;
}) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [isSelected, setIsSelected] = useState<boolean>(item.is_selected);

  const { updateCartApi } = useUpdateCartApi();
  const { removeFromCartApi } = useRemoveFromCartApi();

  const { isAuthenticated } = useSelector(getAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateCart = async (isNewSelected: boolean = isSelected) => {
    if (isAuthenticated) {
      await updateCartApi(Number(item.id), {
        quantity,
        is_selected: isNewSelected,
      });
    } else {
      dispatch(
        updateCartData({
          quantity,
          is_selected: isNewSelected,
          productId: item.product.id,
        })
      );
    }
    setIsItemUpdated((prev) => !prev);
    setIsAllSelected(undefined);
  };

  const removeFromCart = async () => {
    if (isAuthenticated) {
      await removeFromCartApi(item.product.id);
    } else {
      dispatch(removeProductFromCart({ productId: item.product.id }));
    }
    setCartProducts((prev) =>
      prev.filter((e) => e.product.id !== item.product.id)
    );
  };

  useEffect(() => {
    if (item.quantity !== quantity) {
      updateCart();
    }
  }, [quantity]);

  useEffect(() => {
    if (typeof isAllSelected === "boolean") {
      setIsSelected(isAllSelected);
    }
  }, [isAllSelected]);

  return (
    <div>
      <div className="mt-6 flex items-center gap-2">
        <div className="w-[3%]">
          <Checkbox
            isChecked={isSelected}
            onChange={() => {
              setIsSelected((prev) => !prev);
              updateCart(!isSelected);
            }}
          />
        </div>
        <div className="w-[27%] flex items-center justify-center">
          <img
            src={item?.product?.productImages?.[0].image_url}
            onClick={() =>
              navigate(`${ICustomerRoutes.Product + "/" + item.product.id}`)
            }
            className="w-[100px] h-[100px] object-contain cursor-pointer"
          />
        </div>
        <div className="w-[67%] flex flex-col text-left">
          <h1 className="font-primary">{item.product.name}</h1>
          <p className="opacity-70 text-[12px] font-primary">
            {item.product.brand}
          </p>

          <div className="mt-2 flex justify-between items-center pr-6">
            <p className="font-semibold">
              {item.product.selling_price}
              {rupeesSymbol}
            </p>
            <Quantity
              quantity={quantity}
              setQuantity={setQuantity}
              availableQuantity={item.product.available_quantity}
              iconSize="16px"
              textSize="16px"
            />
          </div>
        </div>
        <div onClick={removeFromCart}>
          <AiOutlineClose className="text-[18px]" />
        </div>
      </div>
      <div className="h-[1px] bg-primary opacity-50 mt-6 mb-6" />
    </div>
  );
};

export default CartCard;
