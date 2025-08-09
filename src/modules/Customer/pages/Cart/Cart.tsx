import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../../../../redux/slices/auth.slice";
import { getCart, toggleSelection } from "../../../../redux/slices/cart.slice";
import { useEffect, useState } from "react";
import { ICart, ResponseType } from "../../../../types";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../components/types";
import { ICustomerRoutes } from "../../types";
import { useNavigate } from "react-router-dom";
import { useFetchCartApi, useToggleSelectionApi } from "./services";
import Checkbox from "../../../../components/form-fields/Checkbox";
import CartCard from "./components/CartCard";

const Cart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartProducts, setCartProducts] = useState<ICart[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>();
  const [initialSelected, setInitialSelected] = useState<boolean>();
  const [isItemUpdated, setIsItemUpdated] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { fetchCartApi } = useFetchCartApi();
  const { toggleSelectionApi } = useToggleSelectionApi();

  const { isAuthenticated } = useSelector(getAuth);
  const { cartData, totalPrice: price } = useSelector(getCart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchCartData = async () => {
    setIsLoading(true);
    const initialCartData: ICart[] = [];

    if (!isAuthenticated) {
      initialCartData.push(...cartData);
      setCartProducts(cartData);
      setTotalPrice(price);
    } else {
      const { data } = await fetchCartApi();
      if (data.responseType === ResponseType.Success) {
        initialCartData.push(...data.data.cartData);
        setCartProducts(data.data.cartData);
        setTotalPrice(data.data.totalPrice);
      }
    }
    let isSomethingFalse = false;
    for (const product of initialCartData) {
      if (String(product.is_selected) === "false") {
        setInitialSelected(false);
        isSomethingFalse = true;
        break;
      }
    }
    if (!isSomethingFalse) {
      setInitialSelected(true);
    }
    setIsLoading(false);
  };

  const toggleAllSelection = async () => {
    if (isAuthenticated) {
      await toggleSelectionApi(
        typeof isAllSelected === "boolean" ? !isAllSelected : !initialSelected
      );
    } else {
      dispatch(
        toggleSelection({
          toggleType:
            typeof isAllSelected === "boolean"
              ? !isAllSelected
              : !initialSelected,
        })
      );
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [isItemUpdated]);

  if (isLoading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (cartProducts.length === 0) {
    return (
      <div>
        <p className="mt-5 sm:text-[16px]">Your cart is empty.</p>
        <Button
          label="Shop Now"
          displayType={ButtonDisplayType.Primary}
          externalClasses="text-[14px] mx-auto py-2 px-2 mt-6 sm:text-[16px]"
          onClickHandler={() => navigate(ICustomerRoutes.Shop)}
        />
      </div>
    );
  }

  return (
    <div className="mt-6 text-primary">
      <div className="w-[90%] mx-auto">
        <p className="underline font-secondary text-right text-primary mt-5 mr-3 cursor-pointer sm:text-[18px] lg:hidden">
          View Summary
        </p>
        <div className="flex mb-4 items-center gap-2 mt-2">
          <Checkbox
            isChecked={isAllSelected ?? initialSelected}
            onChange={async () => {
              setIsAllSelected((prev) => {
                if (typeof prev === "boolean") {
                  return !prev;
                } else {
                  return !initialSelected;
                }
              });
              toggleAllSelection();
            }}
          />
          <p className="text-[14px]">Toggle all products</p>
        </div>
        <div className="h-[1px] bg-primary opacity-50 " />
        <div>
          {cartProducts.map((item: ICart) => (
            <CartCard
              item={item}
              isAllSelected={isAllSelected}
              key={item.product.id}
              setIsItemUpdated={setIsItemUpdated}
              setIsAllSelected={setIsAllSelected}
              setCartProducts={setCartProducts}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
