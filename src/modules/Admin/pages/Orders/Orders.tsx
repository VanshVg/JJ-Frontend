import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAdminFetchOrdersApi } from "../../services";
import { IAdminOrderSummary } from "../../types";
import { OrderStatus } from "../../types";
import { ResponseType } from "../../../../types";
import { rupeesSymbol } from "../../../../types/constants";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "./config";
import { IAdminRoutes } from "../../../Customer/types";

const STATUS_TABS: { label: string; value: string }[] = [
  { label: "All", value: "" },
  { label: "Pending", value: OrderStatus.Pending },
  { label: "Confirmed", value: OrderStatus.Confirmed },
  { label: "Packed", value: OrderStatus.Packed },
  { label: "Dispatched", value: OrderStatus.Dispatched },
  { label: "Delivered", value: OrderStatus.Delivered },
  { label: "Cancelled", value: OrderStatus.Cancelled },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState<IAdminOrderSummary[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const statusFilter = searchParams.get("status") || "";
  const { fetchOrdersApi, isLoading } = useAdminFetchOrdersApi();

  const load = async () => {
    const { data } = await fetchOrdersApi({
      page,
      limit: 15,
      status: statusFilter || undefined,
      search: search || undefined,
    });
    if (data?.responseType === ResponseType.Success) {
      setOrders(data.data.orders);
      setTotalRecords(data.data.totalRecords);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [statusFilter, search]);

  useEffect(() => {
    load();
  }, [page, statusFilter, search]);

  const totalPages = Math.ceil(totalRecords / 15);

  return (
    <div className="p-8">
      <h1 className="text-[22px] font-bold mb-6">Orders</h1>

      {/* Status tabs */}
      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              if (tab.value) {
                setSearchParams({ status: tab.value });
              } else {
                setSearchParams({});
              }
            }}
            className={`px-4 py-2 rounded-md text-[13px] font-medium whitespace-nowrap transition-colors ${
              statusFilter === tab.value
                ? "bg-primary text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by customer name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-200 rounded-md px-4 py-2 text-[14px] outline-none focus:border-primary"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-[14px] opacity-40">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="p-6 text-[14px] opacity-40">No orders found.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold opacity-50">
                  Order
                </th>
                <th className="text-left px-4 py-3 font-semibold opacity-50">
                  Customer
                </th>
                <th className="text-left px-4 py-3 font-semibold opacity-50">
                  Items
                </th>
                <th className="text-right px-4 py-3 font-semibold opacity-50">
                  Total
                </th>
                <th className="text-center px-4 py-3 font-semibold opacity-50">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-semibold opacity-50">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    navigate(`${IAdminRoutes.Orders}/${order.id}`)
                  }
                >
                  <td className="px-4 py-3 font-medium">#{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">
                      {order.user.first_name} {order.user.last_name}
                    </p>
                    <p className="text-[11px] opacity-40">
                      {order.user.contact_no}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex -space-x-2">
                      {order.orderItems.slice(0, 3).map((item) =>
                        item.product.productImages?.[0] ? (
                          <img
                            key={item.id}
                            src={item.product.productImages[0].image_url}
                            className="w-7 h-7 rounded-full border-2 border-white object-cover"
                            title={item.product.name}
                          />
                        ) : (
                          <div
                            key={item.id}
                            className="w-7 h-7 rounded-full border-2 border-white bg-gray-200"
                          />
                        )
                      )}
                    </div>
                    <p className="text-[11px] opacity-40 mt-1">
                      {order.orderItems.length} item
                      {order.orderItems.length !== 1 ? "s" : ""}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {rupeesSymbol}
                    {Number(order.total_amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] font-medium ${
                        ORDER_STATUS_COLORS[order.order_status]
                      }`}
                    >
                      {ORDER_STATUS_LABELS[order.order_status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 opacity-50">
                    {new Date(order.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-[13px] opacity-40">
            {totalRecords} orders total
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border border-gray-200 rounded text-[13px] disabled:opacity-30"
            >
              Prev
            </button>
            <span className="px-3 py-1 text-[13px] opacity-60">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border border-gray-200 rounded text-[13px] disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
