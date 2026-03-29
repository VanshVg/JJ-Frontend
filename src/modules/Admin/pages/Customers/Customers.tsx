import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAdminFetchCustomerByIdApi,
  useAdminFetchCustomersApi,
} from "../../services";
import { IAdminCustomer, IAdminOrderSummary } from "../../types";
import { ResponseType } from "../../../../types";
import { rupeesSymbol } from "../../../../types/constants";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "../Orders/config";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<IAdminCustomer[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<{
    customer: IAdminCustomer;
    orders: IAdminOrderSummary[];
    totalSpent: number;
  } | null>(null);

  const { fetchCustomersApi, isLoading } = useAdminFetchCustomersApi();
  const { fetchCustomerByIdApi, isLoading: isLoadingDetail } =
    useAdminFetchCustomerByIdApi();
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await fetchCustomersApi({
      page,
      search: search || undefined,
    });
    if (data?.responseType === ResponseType.Success) {
      setCustomers(data.data.customers);
      setTotalRecords(data.data.totalRecords);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    load();
  }, [page, search]);

  const openCustomer = async (id: number) => {
    const { data } = await fetchCustomerByIdApi(id);
    if (data?.responseType === ResponseType.Success) {
      setSelected({
        customer: data.data.customer,
        orders: data.data.orders,
        totalSpent: data.data.totalSpent,
      });
    }
  };

  const totalPages = Math.ceil(totalRecords / 20);

  return (
    <div className="p-8">
      <h1 className="text-[22px] font-bold mb-6">Customers</h1>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-200 rounded-md px-4 py-2 text-[14px] outline-none focus:border-primary"
        />
      </div>

      <div className="flex gap-6">
        {/* Customer list */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg overflow-hidden">
          {isLoading ? (
            <p className="p-6 text-[14px] opacity-40">Loading...</p>
          ) : customers.length === 0 ? (
            <p className="p-6 text-[14px] opacity-40">No customers found.</p>
          ) : (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold opacity-50">
                    Customer
                  </th>
                  <th className="text-center px-4 py-3 font-semibold opacity-50">
                    Orders
                  </th>
                  <th className="text-right px-4 py-3 font-semibold opacity-50">
                    Total Spent
                  </th>
                  <th className="text-left px-4 py-3 font-semibold opacity-50">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {customers.map((c) => (
                  <tr
                    key={c.id}
                    className={`cursor-pointer transition-colors ${
                      selected?.customer.id === c.id
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => openCustomer(c.id)}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium">
                        {c.first_name} {c.last_name}
                      </p>
                      <p className="text-[11px] opacity-40">{c.contact_no}</p>
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">
                      {c.orderCount}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {rupeesSymbol}
                      {c.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 opacity-50">
                      {new Date(c.created_at).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <p className="text-[12px] opacity-40">{totalRecords} total</p>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1 border border-gray-200 rounded text-[12px] disabled:opacity-30"
                >
                  Prev
                </button>
                <span className="px-2 py-1 text-[12px] opacity-60">
                  {page} / {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 border border-gray-200 rounded text-[12px] disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Customer detail panel */}
        {selected && (
          <div className="w-[320px] shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-[15px]">
                  {selected.customer.first_name} {selected.customer.last_name}
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[12px] opacity-40 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
              <p className="text-[13px] opacity-60 mb-1">
                {selected.customer.contact_no}
              </p>
              {selected.customer.email && (
                <p className="text-[13px] opacity-60 mb-3">
                  {selected.customer.email}
                </p>
              )}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-gray-50 rounded-md p-3 text-center">
                  <p className="text-[22px] font-bold">
                    {selected.orders.length}
                  </p>
                  <p className="text-[11px] opacity-40">Orders</p>
                </div>
                <div className="bg-gray-50 rounded-md p-3 text-center">
                  <p className="text-[18px] font-bold">
                    {rupeesSymbol}
                    {selected.totalSpent.toFixed(0)}
                  </p>
                  <p className="text-[11px] opacity-40">Total Spent</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <p className="px-4 py-3 font-semibold text-[14px] border-b border-gray-100">
                Order History
              </p>
              {isLoadingDetail ? (
                <p className="p-4 text-[13px] opacity-40">Loading...</p>
              ) : selected.orders.length === 0 ? (
                <p className="p-4 text-[13px] opacity-40">No orders yet.</p>
              ) : (
                <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
                  {selected.orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        navigate(`/admin/orders/${order.id}`)
                      }
                    >
                      <div>
                        <p className="text-[13px] font-medium">
                          #{order.id}
                        </p>
                        <p className="text-[11px] opacity-40">
                          {new Date(order.created_at).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] font-semibold">
                          {rupeesSymbol}
                          {Number(order.total_amount).toFixed(2)}
                        </p>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            ORDER_STATUS_COLORS[order.order_status]
                          }`}
                        >
                          {ORDER_STATUS_LABELS[order.order_status]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;
