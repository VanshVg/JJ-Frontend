import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useAdminDeleteProductApi,
  useAdminFetchProductsApi,
} from "../../services";
import { IAdminProduct } from "../../types";
import { IAdminRoutes } from "../../../Customer/types";
import { ResponseType } from "../../../../types";
import { rupeesSymbol } from "../../../../types/constants";

const AdminProducts = () => {
  const [products, setProducts] = useState<IAdminProduct[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const lowStockOnly = searchParams.get("lowStock") === "true";
  const { fetchProductsApi, isLoading } = useAdminFetchProductsApi();
  const { deleteProductApi } = useAdminDeleteProductApi();

  const load = async () => {
    const { data } = await fetchProductsApi({
      page,
      search: search || undefined,
      lowStock: lowStockOnly || undefined,
    });
    if (data?.responseType === ResponseType.Success) {
      setProducts(data.data.products);
      setTotalRecords(data.data.totalRecords);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search, lowStockOnly]);

  useEffect(() => {
    load();
  }, [page, search, lowStockOnly]);

  const handleDelete = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    if (!confirm("Delete this product?")) return;
    const { data } = await deleteProductApi(productId);
    if (data?.responseType === ResponseType.Success) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setTotalRecords((c) => c - 1);
    }
  };

  const totalPages = Math.ceil(totalRecords / 15);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[22px] font-bold">
          Products{lowStockOnly ? " — Low Stock" : ""}
        </h1>
        <button
          onClick={() => navigate(IAdminRoutes.ProductNew)}
          className="bg-primary text-white px-4 py-2 rounded-md text-[14px] font-medium"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name, brand, or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-200 rounded-md px-4 py-2 text-[14px] outline-none focus:border-primary"
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-[14px] opacity-40">Loading...</p>
        ) : products.length === 0 ? (
          <p className="p-6 text-[14px] opacity-40">No products found.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold opacity-50">
                  Product
                </th>
                <th className="text-left px-4 py-3 font-semibold opacity-50">
                  Category
                </th>
                <th className="text-right px-4 py-3 font-semibold opacity-50">
                  MRP
                </th>
                <th className="text-right px-4 py-3 font-semibold opacity-50">
                  Price
                </th>
                <th className="text-center px-4 py-3 font-semibold opacity-50">
                  Stock
                </th>
                <th className="text-center px-4 py-3 font-semibold opacity-50">
                  Sold
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    navigate(`${IAdminRoutes.Products}/${product.id}/edit`)
                  }
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.productImages?.[0] ? (
                        <img
                          src={product.productImages[0].image_url}
                          className="w-9 h-9 rounded object-cover shrink-0"
                          alt={product.name}
                        />
                      ) : (
                        <div className="w-9 h-9 rounded bg-gray-100 shrink-0" />
                      )}
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-[11px] opacity-40">
                          {product.brand} · {product.weight}
                          {product.weight_unit}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 opacity-60">
                    {product.category?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right opacity-60 line-through">
                    {rupeesSymbol}
                    {Number(product.MRP).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {rupeesSymbol}
                    {Number(product.selling_price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-semibold ${
                        product.available_quantity === 0
                          ? "text-red-500"
                          : product.available_quantity <= 10
                          ? "text-orange-500"
                          : "text-green-600"
                      }`}
                    >
                      {product.available_quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center opacity-50">
                    {product.sold_quantity}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => handleDelete(e, product.id)}
                      className="text-[12px] text-red-400 hover:text-red-600 px-2 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-[13px] opacity-40">{totalRecords} products total</p>
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

export default AdminProducts;
