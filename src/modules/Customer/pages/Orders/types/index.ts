export enum PaymentMethod {
  COD = "cod",
  Razorpay = "razorpay",
}

export enum PaymentStatus {
  Pending = "pending",
  Paid = "paid",
  Failed = "failed",
  Refunded = "refunded",
}

export enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Packed = "packed",
  Dispatched = "dispatched",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export interface IOrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price_at_time: number;
  discount_at_time: number;
  product: {
    id: number;
    name: string;
    brand: string;
    weight: number;
    weight_unit: string;
    productImages?: { image_url: string }[];
  };
}

export interface IOrderAddress {
  address_line_1: string;
  address_line_2?: string;
  landmark?: string;
  pincode: number;
  address_type: string;
}

export interface IOrder {
  id: number;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  notes?: string;
  created_at: string;
  orderItems: IOrderItem[];
  address?: IOrderAddress;
}

export interface IPlaceOrderPayload {
  address_id: number;
  payment_method: PaymentMethod;
  notes?: string;
}
