import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAdminFetchOrderByIdApi,
  useAdminMarkOrderPaidApi,
  useAdminUpdateOrderStatusApi,
} from "../../services";
import { ResponseType } from "../../../../types";
import { rupeesSymbol } from "../../../../types/constants";
import { IOrder, OrderStatus, PaymentStatus } from "../../types";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "./config";
import { IAdminRoutes } from "../../../Customer/types";

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  [OrderStatus.Pending]: OrderStatus.Confirmed,
  [OrderStatus.Confirmed]: OrderStatus.Packed,
  [OrderStatus.Packed]: OrderStatus.Dispatched,
  [OrderStatus.Dispatched]: OrderStatus.Delivered,
};

const AdminOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { fetchOrderByIdApi } = useAdminFetchOrderByIdApi();
  const { updateOrderStatusApi, isLoading: isUpdating } =
    useAdminUpdateOrderStatusApi();
  const { markOrderPaidApi, isLoading: isMarkingPaid } =
    useAdminMarkOrderPaidApi();

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

  const handleStatusUpdate = async (status: OrderStatus) => {
    const { data } = await updateOrderStatusApi(Number(id), status);
    if (data?.responseType === ResponseType.Success) {
      setOrder((prev) => prev ? { ...prev, order_status: status } : prev);
    }
  };

  const handleMarkPaid = async () => {
    const { data } = await markOrderPaidApi(Number(id));
    if (data?.responseType === ResponseType.Success) {
      setOrder((prev) =>
        prev ? { ...prev, payment_status: PaymentStatus.Paid } : prev
      );
    }
  };

  if (isLoading) {
    return <p className="p-8 text-[14px] opacity-40">Loading...</p>;
  }

  if (!order) {
    return (
      <div className="p-8">
        <p className="opacity-40">Order not found.</p>
        <button
          onClick={() => navigate(IAdminRoutes.Orders)}
          className="mt-4 text-[13px] underline"
        >
          Back to orders
        </button>
      </div>
    );
  }

  const nextStatus = NEXT_STATUS[order.order_status];

  return (
    <div className="p-8 max-w-[900px]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(IAdminRoutes.Orders)}
          className="text-[13px] opacity-40 hover:opacity-100"
        >
          ← Orders
        </button>
        <h1 className="text-[22px] font-bold">Order #{order.id}</h1>
        <span
          className={`px-3 py-1 rounded-full text-[12px] font-medium ${
            ORDER_STATUS_COLORS[order.order_status]
          }`}
        >
          {ORDER_STATUS_LABELS[order.order_status]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column: items + totals */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Items */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-[15px]">Items</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                  {item.product.productImages?.[0] ? (
                    <img
                      src={item.product.productImages[0].image_url}
                      className="w-11 h-11 rounded object-cover shrink-0"
                      alt={item.product.name}
                    />
                  ) : (
                    <div className="w-11 h-11 rounded bg-gray-100 shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-[14px] font-medium">
                      {item.product.name}
                    </p>
                    <p className="text-[12px] opacity-40">
                      {item.product.weight}
                      {item.product.weight_unit} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-[14px] font-semibold">
                    {rupeesSymbol}
                    {(item.price_at_time * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-gray-100 space-y-1">
              <div className="flex justify-between text-[13px] opacity-60">
                <span>Subtotal</span>
                <span>
                  {rupeesSymbol}
                  {Number(order.subtotal).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[13px] opacity-60">
                <span>Delivery</span>
                <span>
                  {Number(order.delivery_fee) === 0
                    ? "Free"
                    : `${rupeesSymbol}${Number(order.delivery_fee).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-[15px] font-bold pt-1">
                <span>Total</span>
                <span>
                  {rupeesSymbol}
                  {Number(order.total_amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: actions + info */}
        <div className="flex flex-col gap-5">
          {/* Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="font-semibold text-[15px] mb-4">Actions</h2>

            {nextStatus && (
              <button
                disabled={isUpdating}
                onClick={() => handleStatusUpdate(nextStatus)}
                className="w-full bg-primary text-white py-2.5 rounded-md text-[14px] font-medium mb-3 disabled:opacity-50"
              >
                Mark as {ORDER_STATUS_LABELS[nextStatus]}
              </button>
            )}

            {order.order_status !== OrderStatus.Cancelled &&
              order.order_status !== OrderStatus.Delivered && (
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusUpdate(OrderStatus.Cancelled)}
                  className="w-full border border-red-200 text-red-500 py-2 rounded-md text-[13px] mb-3 disabled:opacity-50"
                >
                  Cancel Order
                </button>
              )}

            {order.payment_status !== PaymentStatus.Paid && (
              <button
                disabled={isMarkingPaid}
                onClick={handleMarkPaid}
                className="w-full border border-green-200 text-green-600 py-2 rounded-md text-[13px] disabled:opacity-50"
              >
                Mark as Paid
              </button>
            )}
          </div>

          {/* Customer */}
          {(order as any).user && (
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="font-semibold text-[15px] mb-3">Customer</h2>
              <p className="text-[14px] font-medium">
                {(order as any).user.first_name} {(order as any).user.last_name}
              </p>
              <p className="text-[13px] opacity-50">
                {(order as any).user.contact_no}
              </p>
              {(order as any).user.email && (
                <p className="text-[13px] opacity-50">
                  {(order as any).user.email}
                </p>
              )}
            </div>
          )}

          {/* Payment */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="font-semibold text-[15px] mb-3">Payment</h2>
            <div className="flex justify-between text-[13px] mb-1">
              <span className="opacity-50">Method</span>
              <span className="font-medium uppercase">
                {order.payment_method}
              </span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="opacity-50">Status</span>
              <span
                className={`font-medium capitalize ${
                  order.payment_status === PaymentStatus.Paid
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                {order.payment_status}
              </span>
            </div>
          </div>

          {/* Address */}
          {order.address && (
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="font-semibold text-[15px] mb-3">
                Delivery Address
              </h2>
              <p className="text-[13px] leading-relaxed opacity-70">
                {order.address.address_line_1}
                {order.address.address_line_2
                  ? `, ${order.address.address_line_2}`
                  : ""}
                {order.address.landmark
                  ? `, near ${order.address.landmark}`
                  : ""}
                <br />
                Pincode {order.address.pincode}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
