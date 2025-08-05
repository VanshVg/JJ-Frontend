import { useEffect, useState } from "react";
import Checkbox from "../../../../../components/form-fields/Checkbox";
import { ICart } from "../../../../../types";
import Quantity from "../../../../../components/Quantity";
import { AiOutlineClose } from "react-icons/ai";
import { rupeesSymbol } from "../../../../../types/constants";
import { useUpdateCartApi } from "../services";

const CartCard = ({
  item,
  isAllSelected,
}: {
  item: ICart;
  isAllSelected?: boolean;
}) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [isSelected, setIsSelected] = useState<boolean>(item.is_selected);

  const { updateCartApi } = useUpdateCartApi();

  const updateCart = async (isNewSelected: boolean = isSelected) => {
    await updateCartApi(Number(item.id), {
      quantity,
      is_selected: isNewSelected,
    });
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
            className="w-[100px] h-[100px] object-contain"
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
        <div>
          <AiOutlineClose className="text-[18px]" />
        </div>
      </div>
      <div className="h-[1px] bg-primary opacity-50 mt-6 mb-6" />
    </div>
  );
};

export default CartCard;
