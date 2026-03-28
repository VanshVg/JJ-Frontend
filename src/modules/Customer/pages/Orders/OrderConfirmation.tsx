import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchOrderByIdApi } from "./services";
import { ResponseType } from "../../../../types";
import { IOrder } from "./types";
import { ICustomerRoutes } from "../../types";
import { rupeesSymbol } from "../../../../types/constants";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../components/types";
import { BsCheckCircleFill } from "react-icons/bs";

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchOrderByIdApi } = useFetchOrderByIdApi();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchOrderByIdApi(Number(id));
      if (data?.responseType === ResponseType.Success) {
        setOrder(data.data);
      }
      setIsLoading(false);
    };
    load();
  }, [id]);

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!order) {
    return (
      <div className="text-center mt-10">
        <p>Order not found.</p>
        <Button
          label="Go Home"
          displayType={ButtonDisplayType.Primary}
          externalClasses="mx-auto mt-4 py-2 px-6 text-[14px]"
          onClickHandler={() => navigate(ICustomerRoutes.Home)}
        />
      </div>
    );
  }

  return (
    <div className="w-[90%] max-w-[600px] mx-auto mt-8 pb-10 text-primary">
      {/* Success Header */}
      <div className="text-center mb-8">
        <BsCheckCircleFill className="text-green-500 text-[52px] mx-auto mb-3" />
        <h1 className="text-[26px] font-semibold">Order Placed!</h1>
        <p className="text-[14px] opacity-60 mt-1">
          Order #{order.id} has been confirmed.
        </p>
        <p className="text-[14px] opacity-60">
          Our team will contact you before delivery.
        </p>
      </div>

      {/* Order Details */}
      <div className="border border-gray-200 rounded-md p-5 mb-5">
        <h2 className="font-semibold text-[16px] mb-4">Items Ordered</h2>
        <div className="flex flex-col gap-3">
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              {item.product.productImages?.[0] && (
                <img
                  src={item.product.productImages[0].image_url}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <p className="text-[14px] font-medium">{item.product.name}</p>
                <p className="text-[12px] opacity-60">
                  {item.product.weight}
                  {item.product.weight_unit} × {item.quantity}
                </p>
              </div>
              <p className="text-[14px] font-medium">
                {rupeesSymbol}
                {(item.price_at_time * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="h-[1px] bg-primary opacity-10 my-4" />

        <div className="flex justify-between text-[13px] mb-1 opacity-70">
          <span>Subtotal</span>
          <span>
            {rupeesSymbol}
            {Number(order.subtotal).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-[13px] mb-1 opacity-70">
          <span>Delivery Fee</span>
          <span>
            {Number(order.delivery_fee) === 0
              ? "Free"
              : `${rupeesSymbol}${Number(order.delivery_fee).toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between font-bold text-[15px] mt-2">
          <span>Total</span>
          <span>
            {rupeesSymbol}
            {Number(order.total_amount).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Payment & Status */}
      <div className="border border-gray-200 rounded-md p-5 mb-5">
        <div className="flex justify-between text-[14px] mb-2">
          <span className="opacity-60">Payment Method</span>
          <span className="font-medium uppercase">{order.payment_method}</span>
        </div>
        <div className="flex justify-between text-[14px] mb-2">
          <span className="opacity-60">Order Status</span>
          <span className="font-medium capitalize">{order.order_status}</span>
        </div>
        {order.address && (
          <div className="flex justify-between text-[14px]">
            <span className="opacity-60">Delivering to</span>
            <span className="font-medium text-right max-w-[55%]">
              {order.address.address_line_1}
              {order.address.address_line_2
                ? `, ${order.address.address_line_2}`
                : ""}
              {" — "}
              {order.address.pincode}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Button
          label="View All Orders"
          displayType={ButtonDisplayType.Primary}
          externalClasses="w-full justify-center py-3 text-[15px]"
          onClickHandler={() => navigate(ICustomerRoutes.Orders)}
        />
        <Button
          label="Continue Shopping"
          displayType={ButtonDisplayType.Secondary}
          externalClasses="w-full justify-center py-2 text-[14px]"
          onClickHandler={() => navigate(ICustomerRoutes.Shop)}
        />
      </div>
    </div>
  );
};

export default OrderConfirmation;
