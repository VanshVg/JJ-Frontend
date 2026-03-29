import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth } from "../../../../redux/slices/auth.slice";
import { IAuthenticationRoutes } from "../../../Authentication/types";
import { useFetchOrdersApi } from "./services";
import { ResponseType } from "../../../../types";
import { IOrder, OrderStatus } from "./types";
import { ICustomerRoutes } from "../../types";
import { rupeesSymbol } from "../../../../types/constants";
import Button from "../../../../components/Button";
import { ButtonDisplayType } from "../../../../components/types";

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "bg-yellow-100 text-yellow-700",
  [OrderStatus.Confirmed]: "bg-blue-100 text-blue-700",
  [OrderStatus.Packed]: "bg-indigo-100 text-indigo-700",
  [OrderStatus.Dispatched]: "bg-purple-100 text-purple-700",
  [OrderStatus.Delivered]: "bg-green-100 text-green-700",
  [OrderStatus.Cancelled]: "bg-red-100 text-red-700",
};

const Orders = () => {
  const { isAuthenticated } = useSelector(getAuth);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchOrdersApi } = useFetchOrdersApi();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchOrdersApi();
      if (data?.responseType === ResponseType.Success) {
        setOrders(data.data.orders);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={IAuthenticationRoutes.Login} />;
  }

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10 text-primary">
        <p className="text-[18px] font-medium">No orders yet.</p>
        <p className="text-[14px] opacity-60 mt-1">
          Place your first order from the shop.
        </p>
        <Button
          label="Shop Now"
          displayType={ButtonDisplayType.Primary}
          externalClasses="mx-auto mt-5 py-2 px-6 text-[14px]"
          onClickHandler={() => navigate(ICustomerRoutes.Shop)}
        />
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto mt-6 pb-10 text-primary">
      <h1 className="text-[28px] font-semibold mb-6">My Orders</h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() =>
              navigate(`${ICustomerRoutes.Orders}/${order.id}`)
            }
            className="border border-gray-200 rounded-md p-4 cursor-pointer hover:border-primary transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-[15px]">Order #{order.id}</p>
                <p className="text-[12px] opacity-50">
                  {new Date(order.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span
                className={`text-[12px] font-medium px-2 py-1 rounded-full capitalize ${
                  statusColors[order.order_status]
                }`}
              >
                {order.order_status}
              </span>
            </div>

            {/* Item previews */}
            <div className="flex gap-2 mb-3">
              {order.orderItems.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  {item.product.productImages?.[0] ? (
                    <img
                      src={item.product.productImages[0].image_url}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 rounded" />
                  )}
                </div>
              ))}
              {order.orderItems.length > 3 && (
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-[12px] opacity-60">
                  +{order.orderItems.length - 3}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[13px] opacity-60">
                {order.orderItems.length} item
                {order.orderItems.length > 1 ? "s" : ""} ·{" "}
                <span className="uppercase text-[11px]">
                  {order.payment_method}
                </span>
              </p>
              <p className="font-semibold text-[15px]">
                {rupeesSymbol}
                {Number(order.total_amount).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
