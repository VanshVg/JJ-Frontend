import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminDashboardApi } from "../../services";
import { IDashboardStats } from "../../types";
import { ResponseType } from "../../../../types";
import { rupeesSymbol } from "../../../../types/constants";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "../Orders/config";
import { IAdminRoutes } from "../../../Customer/types";

const StatCard = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-5">
    <p className="text-[12px] uppercase tracking-wide opacity-40 mb-1">{label}</p>
    <p className="text-[28px] font-bold">{value}</p>
    {sub && <p className="text-[12px] opacity-50 mt-1">{sub}</p>}
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState<IDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchDashboardApi } = useAdminDashboardApi();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardApi().then(({ data }) => {
      if (data?.responseType === ResponseType.Success) {
        setStats(data.data);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p className="p-8 text-[14px] opacity-50">Loading...</p>;
  }

  if (!stats) return null;

  return (
    <div className="p-8">
      <h1 className="text-[22px] font-bold mb-6">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Today's Orders"
          value={stats.todayOrdersCount}
        />
        <StatCard
          label="Today's Revenue"
          value={`${rupeesSymbol}${stats.todayRevenue.toFixed(2)}`}
        />
        <StatCard
          label="Pending Orders"
          value={stats.pendingOrders}
          sub="Awaiting confirmation"
        />
        <StatCard
          label="Low Stock Items"
          value={stats.lowStockItems}
          sub="≤ 10 units"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-[15px]">Recent Orders</h2>
            <button
              onClick={() => navigate(IAdminRoutes.Orders)}
              className="text-[12px] opacity-50 hover:opacity-100"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentOrders.length === 0 ? (
              <p className="px-5 py-4 text-[13px] opacity-40">No orders yet.</p>
            ) : (
              stats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`${IAdminRoutes.Orders}/${order.id}`)}
                >
                  <div>
                    <p className="text-[13px] font-medium">
                      #{order.id} —{" "}
                      {order.user.first_name} {order.user.last_name}
                    </p>
                    <p className="text-[11px] opacity-40">
                      {new Date(order.created_at).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-semibold">
                      {rupeesSymbol}{Number(order.total_amount).toFixed(2)}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ORDER_STATUS_COLORS[order.order_status]}`}
                    >
                      {ORDER_STATUS_LABELS[order.order_status]}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low stock */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-[15px]">Low Stock Alerts</h2>
            <button
              onClick={() =>
                navigate(`${IAdminRoutes.Products}?lowStock=true`)
              }
              className="text-[12px] opacity-50 hover:opacity-100"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.lowStockProducts.length === 0 ? (
              <p className="px-5 py-4 text-[13px] opacity-40">
                All products are well stocked.
              </p>
            ) : (
              stats.lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    navigate(`${IAdminRoutes.Products}/${p.id}/edit`)
                  }
                >
                  {p.productImages?.[0] ? (
                    <img
                      src={p.productImages[0].image_url}
                      className="w-9 h-9 rounded object-cover shrink-0"
                      alt={p.name}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded bg-gray-100 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">{p.name}</p>
                    <p className="text-[11px] opacity-40">{p.brand}</p>
                  </div>
                  <span
                    className={`text-[12px] font-bold ${
                      p.available_quantity === 0
                        ? "text-red-500"
                        : "text-orange-500"
                    }`}
                  >
                    {p.available_quantity} left
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
