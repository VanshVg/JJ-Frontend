import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCancelOrderApi, useFetchOrderByIdApi } from "./services";
import { ResponseType } from "../../../../types";
import { IOrder, OrderStatus } from "./types";
import { ICustomerRoutes } from "../../types";
import { rupeesSymbol } from "../../../../types/constants";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../components/types";
import Modal from "../../../../components/Modal";

const ORDER_STEPS: OrderStatus[] = [
  OrderStatus.Pending,
  OrderStatus.Confirmed,
  OrderStatus.Packed,
  OrderStatus.Dispatched,
  OrderStatus.Delivered,
];

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "bg-yellow-100 text-yellow-700",
  [OrderStatus.Confirmed]: "bg-blue-100 text-blue-700",
  [OrderStatus.Packed]: "bg-indigo-100 text-indigo-700",
  [OrderStatus.Dispatched]: "bg-purple-100 text-purple-700",
  [OrderStatus.Delivered]: "bg-green-100 text-green-700",
  [OrderStatus.Cancelled]: "bg-red-100 text-red-700",
};

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { fetchOrderByIdApi } = useFetchOrderByIdApi();
  const { cancelOrderApi, isLoading: cancelLoading } = useCancelOrderApi();
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await fetchOrderByIdApi(Number(id));
    if (data?.responseType === ResponseType.Success) {
      setOrder(data.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleCancel = async () => {
    const { data } = await cancelOrderApi(Number(id));
    if (data?.responseType === ResponseType.Success) {
      setShowCancelModal(false);
      load();
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!order) {
    return (
      <div className="text-center mt-10 text-primary">
        <p>Order not found.</p>
        <Button
          label="Back to Orders"
          displayType={ButtonDisplayType.Primary}
          externalClasses="mx-auto mt-4 py-2 px-6 text-[14px]"
          onClickHandler={() => navigate(ICustomerRoutes.Orders)}
        />
      </div>
    );
  }

  const isCancellable =
    order.order_status === OrderStatus.Pending ||
    order.order_status === OrderStatus.Confirmed;

  const currentStepIndex = ORDER_STEPS.indexOf(order.order_status);

  return (
    <div className="w-[90%] max-w-[700px] mx-auto mt-6 pb-10 text-primary">
      {/* Header */}
      <button
        onClick={() => navigate(ICustomerRoutes.Orders)}
        className="text-[14px] opacity-60 mb-4 hover:opacity-100 transition-opacity"
      >
        ← Back to Orders
      </button>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold">Order #{order.id}</h1>
          <p className="text-[13px] opacity-50">
            Placed on{" "}
            {new Date(order.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className={`text-[13px] font-medium px-3 py-1 rounded-full capitalize ${
            statusColors[order.order_status]
          }`}
        >
          {order.order_status}
        </span>
      </div>

      {/* Status Timeline (only if not cancelled) */}
      {order.order_status !== OrderStatus.Cancelled && (
        <div className="border border-gray-200 rounded-md p-5 mb-5">
          <h2 className="font-semibold text-[15px] mb-4">Order Progress</h2>
          <div className="flex items-center">
            {ORDER_STEPS.map((step, index) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 ${
                      index <= currentStepIndex
                        ? "bg-primary border-primary text-white"
                        : "border-gray-300 text-gray-300"
                    }`}
                  >
                    {index < currentStepIndex ? "✓" : index + 1}
                  </div>
                  <p
                    className={`text-[10px] mt-1 capitalize text-center w-14 ${
                      index <= currentStepIndex ? "opacity-80" : "opacity-30"
                    }`}
                  >
                    {step}
                  </p>
                </div>
                {index < ORDER_STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-1 mb-4 ${
                      index < currentStepIndex ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Items */}
      <div className="border border-gray-200 rounded-md p-5 mb-5">
        <h2 className="font-semibold text-[15px] mb-4">Items</h2>
        <div className="flex flex-col gap-4">
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              {item.product.productImages?.[0] ? (
                <img
                  src={item.product.productImages[0].image_url}
                  alt={item.product.name}
                  className="w-14 h-14 object-cover rounded"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-100 rounded" />
              )}
              <div className="flex-1">
                <p className="text-[14px] font-medium">{item.product.name}</p>
                <p className="text-[12px] opacity-60">
                  {item.product.weight}
                  {item.product.weight_unit} · Qty: {item.quantity}
                </p>
                {Number(item.discount_at_time) > 0 && (
                  <p className="text-[11px] text-green-600">
                    {item.discount_at_time}% off applied
                  </p>
                )}
              </div>
              <p className="text-[14px] font-semibold">
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
        <div className="flex justify-between font-bold text-[16px] mt-2">
          <span>Total</span>
          <span>
            {rupeesSymbol}
            {Number(order.total_amount).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Delivery + Payment Info */}
      <div className="border border-gray-200 rounded-md p-5 mb-5">
        {order.address && (
          <div className="mb-3">
            <p className="text-[13px] opacity-50 mb-1">Delivery Address</p>
            <p className="text-[14px]">
              {order.address.address_line_1}
              {order.address.address_line_2
                ? `, ${order.address.address_line_2}`
                : ""}
              {order.address.landmark ? `, ${order.address.landmark}` : ""} —{" "}
              {order.address.pincode}
            </p>
          </div>
        )}
        <div>
          <p className="text-[13px] opacity-50 mb-1">Payment</p>
          <p className="text-[14px] uppercase font-medium">
            {order.payment_method}
          </p>
        </div>
      </div>

      {/* Cancel */}
      {isCancellable && (
        <Button
          label="Cancel Order"
          displayType={ButtonDisplayType.Secondary}
          externalClasses="w-full justify-center py-2 text-[14px] border-red-400 text-red-500 hover:bg-red-500 hover:text-white"
          onClickHandler={() => setShowCancelModal(true)}
        />
      )}

      <Modal
        title="Cancel Order"
        isOpen={showCancelModal}
        closeModal={() => setShowCancelModal(false)}
        confirmModal={handleCancel}
        disableButtons={{ confirm: cancelLoading }}
      >
        <p className="text-primary mt-2 text-[14px]">
          Are you sure you want to cancel order #{order.id}? Stock will be
          restored.
        </p>
      </Modal>
    </div>
  );
};

export default OrderDetail;
