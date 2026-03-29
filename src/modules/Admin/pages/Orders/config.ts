import { OrderStatus } from "../../types";

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "bg-yellow-100 text-yellow-700",
  [OrderStatus.Confirmed]: "bg-blue-100 text-blue-700",
  [OrderStatus.Packed]: "bg-indigo-100 text-indigo-700",
  [OrderStatus.Dispatched]: "bg-purple-100 text-purple-700",
  [OrderStatus.Delivered]: "bg-green-100 text-green-700",
  [OrderStatus.Cancelled]: "bg-red-100 text-red-700",
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "Pending",
  [OrderStatus.Confirmed]: "Confirmed",
  [OrderStatus.Packed]: "Packed",
  [OrderStatus.Dispatched]: "Dispatched",
  [OrderStatus.Delivered]: "Delivered",
  [OrderStatus.Cancelled]: "Cancelled",
};
