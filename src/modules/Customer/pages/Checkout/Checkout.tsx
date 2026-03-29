import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth } from "../../../../redux/slices/auth.slice";
import { getAddress } from "../../../../redux/slices/address.slice";
import { getCart } from "../../../../redux/slices/cart.slice";
import { useFetchUserAddressApi } from "../Account/services";
import { usePlaceOrderApi } from "../Orders/services";
import { ICustomerRoutes } from "../../types";
import { IAuthenticationRoutes } from "../../../Authentication/types";
import { ResponseType } from "../../../../types";
import { PaymentMethod } from "../Orders/types";
import { IUserAddress } from "../Account/types";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../components/types";
import { deliveryFee, rupeesSymbol } from "../../../../types/constants";
import {
  AiFillHome,
  AiOutlineRight,
} from "react-icons/ai";
import { BsBuildingFill } from "react-icons/bs";
import { MdLocalConvenienceStore } from "react-icons/md";

const Checkout = () => {
  const { isAuthenticated } = useSelector(getAuth);
  const { addresses } = useSelector(getAddress);
  const { totalPrice } = useSelector(getCart);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>([]);
  const [notes, setNotes] = useState("");

  const { fetchUserAddressApi, isLoading: addressLoading } = useFetchUserAddressApi();
  const { placeOrderApi, isLoading: orderLoading } = usePlaceOrderApi();

  const navigate = useNavigate();

  const feeAmount = totalPrice > 0 && totalPrice < 500 ? deliveryFee : 0;
  const grandTotal = totalPrice + feeAmount;

  useEffect(() => {
    const load = async () => {
      if (addresses.length > 0) {
        setUserAddresses(addresses);
        const primary = addresses.find((a) => a.is_primary);
        setSelectedAddressId(primary?.id ?? addresses[0]?.id ?? null);
        return;
      }
      const { data } = await fetchUserAddressApi();
      if (data?.responseType === ResponseType.Success) {
        const list: IUserAddress[] = data.data.addresses;
        setUserAddresses(list);
        const primary = list.find((a) => a.is_primary);
        setSelectedAddressId(primary?.id ?? list[0]?.id ?? null);
      }
    };
    load();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={IAuthenticationRoutes.Login} />;
  }

  if (totalPrice <= 0) {
    return <Navigate to={ICustomerRoutes.Cart} />;
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return;
    const { data } = await placeOrderApi({
      address_id: selectedAddressId,
      payment_method: PaymentMethod.COD,
      notes: notes.trim() || undefined,
    });
    if (data?.responseType === ResponseType.Success) {
      navigate(`${ICustomerRoutes.OrderConfirmation}/${data.data.id}`);
    }
  };

  const AddressIcon = ({ type }: { type: string }) => {
    if (type === "work") return <BsBuildingFill />;
    if (type === "other") return <MdLocalConvenienceStore />;
    return <AiFillHome />;
  };

  return (
    <div className="w-[90%] mx-auto mt-6 text-primary pb-10">
      <h1 className="text-[28px] font-semibold mb-6">Checkout</h1>

      <div className="lg:flex lg:gap-10">
        {/* Left — Address + Notes */}
        <div className="lg:w-[60%]">
          {/* Delivery Address */}
          <div className="mb-8">
            <h2 className="text-[18px] font-semibold mb-3">Delivery Address</h2>
            {addressLoading ? (
              <p className="text-[14px] opacity-60">Loading addresses...</p>
            ) : userAddresses.length === 0 ? (
              <div>
                <p className="text-[14px] opacity-60 mb-3">
                  No saved addresses. Please add one first.
                </p>
                <Button
                  label="Add Address"
                  displayType={ButtonDisplayType.Secondary}
                  externalClasses="text-[13px] py-2 px-4"
                  onClickHandler={() =>
                    navigate(`${ICustomerRoutes.Account}/addresses`)
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {userAddresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddressId(address.id)}
                    className={`border rounded-md p-3 cursor-pointer transition-all duration-200 ${
                      selectedAddressId === address.id
                        ? "border-primary bg-gray-50"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedAddressId === address.id
                              ? "border-primary"
                              : "border-gray-400"
                          }`}
                        >
                          {selectedAddressId === address.id && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <AddressIcon type={address.address_type} />
                        <span className="font-semibold capitalize text-[14px]">
                          {address.address_type}
                        </span>
                        {address.is_primary && (
                          <span className="text-[12px] opacity-60 ml-1">
                            (Primary)
                          </span>
                        )}
                      </div>
                      <AiOutlineRight className="text-[12px] opacity-40" />
                    </div>
                    <p className="text-[13px] opacity-70 mt-2 ml-6">
                      {address.address_line_1}
                      {address.address_line_2 ? `, ${address.address_line_2}` : ""}
                      {address.landmark ? `, ${address.landmark}` : ""} —{" "}
                      {address.pincode}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h2 className="text-[18px] font-semibold mb-3">Payment Method</h2>
            <div className="border border-primary rounded-md p-3 flex items-center gap-3 w-fit">
              <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span className="text-[14px] font-medium">Cash on Delivery</span>
            </div>
            <p className="text-[12px] opacity-50 mt-2">
              Pay in cash when your order arrives.
            </p>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <h2 className="text-[18px] font-semibold mb-3">
              Order Notes{" "}
              <span className="text-[14px] font-normal opacity-50">
                (optional)
              </span>
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions for delivery..."
              maxLength={500}
              rows={3}
              className="w-full border border-gray-300 rounded-md p-3 text-[14px] outline-none focus:border-primary resize-none"
            />
          </div>
        </div>

        {/* Right — Order Summary */}
        <div className="lg:w-[40%]">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-5 sticky top-6">
            <h2 className="text-[18px] font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-[14px] mb-2">
              <span>Subtotal</span>
              <span>
                {rupeesSymbol}
                {totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[14px] mb-2">
              <span>Delivery Fee</span>
              <span>
                {feeAmount === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `${rupeesSymbol}${feeAmount}`
                )}
              </span>
            </div>
            {feeAmount === 0 && totalPrice > 0 && (
              <p className="text-[12px] text-green-600 mb-2">
                Free delivery on orders above {rupeesSymbol}500
              </p>
            )}
            {feeAmount > 0 && (
              <p className="text-[12px] opacity-50 mb-2">
                Add {rupeesSymbol}
                {(500 - totalPrice).toFixed(0)} more for free delivery
              </p>
            )}
            <div className="h-[1px] bg-primary opacity-20 my-3" />
            <div className="flex justify-between font-bold text-[16px]">
              <span>Total</span>
              <span>
                {rupeesSymbol}
                {grandTotal.toFixed(2)}
              </span>
            </div>
            <Button
              label={orderLoading ? "Placing Order..." : "Place Order"}
              displayType={ButtonDisplayType.Primary}
              externalClasses="w-full justify-center mt-5 py-3 text-[15px]"
              isDisabled={!selectedAddressId || orderLoading}
              onClickHandler={handlePlaceOrder}
            />
            <Button
              label="Back to Cart"
              displayType={ButtonDisplayType.Secondary}
              externalClasses="w-full justify-center mt-3 py-2 text-[14px]"
              onClickHandler={() => navigate(ICustomerRoutes.Cart)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
