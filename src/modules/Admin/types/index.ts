import { PaymentMethod, PaymentStatus, OrderStatus, IOrder } from "../../Customer/pages/Orders/types";

export { PaymentMethod, PaymentStatus, OrderStatus };
export type { IOrder };

export interface IAdminOrderSummary {
  id: number;
  subtotal: string;
  delivery_fee: string;
  total_amount: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  created_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    contact_no: string;
  };
  orderItems: {
    id: number;
    quantity: number;
    price_at_time: number;
    product: {
      id: number;
      name: string;
      productImages?: { image_url: string }[];
    };
  }[];
}

export interface IAdminProduct {
  id: number;
  name: string;
  brand: string;
  SKU: string;
  weight: number;
  weight_unit: string;
  MRP: string;
  discount: string;
  selling_price: string;
  available_quantity: number;
  sold_quantity: number;
  expiry_date: string;
  created_at: string;
  category?: { id: number; name: string };
  productImages?: { image_url: string }[];
}

export interface IProductFormData {
  name: string;
  brand: string;
  category_id: number | string;
  SKU: string;
  weight: number | string;
  weight_unit: string;
  MRP: number | string;
  discount: number | string;
  selling_price: number | string;
  available_quantity: number | string;
  packaging_date: string;
  expiry_date: string;
  description?: string;
  extra_note?: string;
}

export interface IAdminCustomer {
  id: number;
  first_name: string;
  last_name: string;
  contact_no: string;
  email?: string;
  created_at: string;
  orderCount: number;
  totalSpent: number;
}

export interface IDashboardStats {
  todayOrdersCount: number;
  todayRevenue: number;
  pendingOrders: number;
  lowStockItems: number;
  recentOrders: IAdminOrderSummary[];
  lowStockProducts: {
    id: number;
    name: string;
    brand: string;
    available_quantity: number;
    productImages?: { image_url: string }[];
  }[];
}

export interface ICategory {
  id: number;
  name: string;
}
