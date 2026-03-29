import {
  useAxiosDelete,
  useAxiosGet,
  useAxiosPost,
  useAxiosPut,
} from "../../../hooks/useAxios";
import { IProductFormData } from "../types";
import { OrderStatus } from "../../Customer/pages/Orders/types";

// ── Dashboard ──────────────────────────────────────────────────────────────────

export const useAdminDashboardApi = () => {
  const [callApi, { isLoading }] = useAxiosGet();

  const fetchDashboardApi = () => callApi("/admin/dashboard");

  return { fetchDashboardApi, isLoading };
};

// ── Orders ─────────────────────────────────────────────────────────────────────

export const useAdminFetchOrdersApi = () => {
  const [callApi, { isLoading }] = useAxiosGet();

  const fetchOrdersApi = (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.status) query.set("status", params.status);
    if (params?.search) query.set("search", params.search);
    return callApi(`/admin/orders?${query.toString()}`);
  };

  return { fetchOrdersApi, isLoading };
};

export const useAdminFetchOrderByIdApi = () => {
  const [callApi, { isLoading }] = useAxiosGet();

  const fetchOrderByIdApi = (orderId: number) =>
    callApi(`/admin/orders/${orderId}`);

  return { fetchOrderByIdApi, isLoading };
};

export const useAdminUpdateOrderStatusApi = () => {
  const [callApi, { isLoading }] = useAxiosPut();

  const updateOrderStatusApi = (orderId: number, order_status: OrderStatus) =>
    callApi(`/admin/orders/${orderId}/status`, { order_status });

  return { updateOrderStatusApi, isLoading };
};

export const useAdminMarkOrderPaidApi = () => {
  const [callApi, { isLoading }] = useAxiosPut();

  const markOrderPaidApi = (orderId: number) =>
    callApi(`/admin/orders/${orderId}/mark-paid`, {});

  return { markOrderPaidApi, isLoading };
};

// ── Products ───────────────────────────────────────────────────────────────────

export const useAdminFetchProductsApi = () => {
  const [callApi, { isLoading }] = useAxiosGet();

  const fetchProductsApi = (params?: {
    page?: number;
    search?: string;
    lowStock?: boolean;
  }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.search) query.set("search", params.search);
    if (params?.lowStock) query.set("lowStock", "true");
    return callApi(`/admin/products?${query.toString()}`);
  };

  return { fetchProductsApi, isLoading };
};

export const useAdminFetchProductByIdApi = () => {
  const [callApi, { isLoading }] = useAxiosGet();

  const fetchProductByIdApi = (productId: number) =>
    callApi(`/admin/products/${productId}`);

  return { fetchProductByIdApi, isLoading };
};

export const useAdminCreateProductApi = () => {
  const [callApi, { isLoading }] = useAxiosPost();

  const createProductApi = (data: IProductFormData) =>
    callApi("/admin/products", data as unknown as object);

  return { createProductApi, isLoading };
};

export const useAdminUpdateProductApi = () => {
  const [callApi, { isLoading }] = useAxiosPut();

  const updateProductApi = (productId: number, data: Partial<IProductFormData>) =>
    callApi(`/admin/products/${productId}`, data as object);

  return { updateProductApi, isLoading };
};

export const useAdminDeleteProductApi = () => {
  const [callApi, { isLoading }] = useAxiosDelete();

  const deleteProductApi = (productId: number) =>
    callApi(`/admin/products/${productId}`);

  return { deleteProductApi, isLoading };
};

// ── Customers ─────────────────────────────────────────────────────────────────

export const useAdminFetchCustomersApi = () => {
  const [callApi, { isLoading }] = useAxiosGet();

  const fetchCustomersApi = (params?: { page?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.search) query.set("search", params.search);
    return callApi(`/admin/customers?${query.toString()}`);
  };

  return { fetchCustomersApi, isLoading };
};

export const useAdminFetchCustomerByIdApi = () => {
  const [callApi, { isLoading }] = useAxiosGet();

  const fetchCustomerByIdApi = (customerId: number) =>
    callApi(`/admin/customers/${customerId}`);

  return { fetchCustomerByIdApi, isLoading };
};

// ── Categories (public endpoint) ───────────────────────────────────────────────

export const useAdminFetchCategoriesApi = () => {
  const [callApi, { isLoading }] = useAxiosGet();

  const fetchCategoriesApi = () => callApi("/categories");

  return { fetchCategoriesApi, isLoading };
};
