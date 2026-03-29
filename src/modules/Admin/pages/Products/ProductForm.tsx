import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAdminCreateProductApi,
  useAdminFetchCategoriesApi,
  useAdminFetchProductByIdApi,
  useAdminUpdateProductApi,
} from "../../services";
import { IAdminRoutes } from "../../../Customer/types";
import { ICategory, IProductFormData } from "../../types";
import { ResponseType } from "../../../../types";

const WEIGHT_UNITS = ["g", "kg", "lbs"];

const EMPTY_FORM: IProductFormData = {
  name: "",
  brand: "",
  category_id: "",
  SKU: "",
  weight: "",
  weight_unit: "kg",
  MRP: "",
  discount: 0,
  selling_price: "",
  available_quantity: "",
  packaging_date: "",
  expiry_date: "",
  description: "",
  extra_note: "",
};

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<IProductFormData>(EMPTY_FORM);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof IProductFormData, string>>>({});

  const { fetchProductByIdApi } = useAdminFetchProductByIdApi();
  const { fetchCategoriesApi } = useAdminFetchCategoriesApi();
  const { createProductApi, isLoading: isCreating } = useAdminCreateProductApi();
  const { updateProductApi, isLoading: isUpdating } = useAdminUpdateProductApi();

  useEffect(() => {
    fetchCategoriesApi().then(({ data }) => {
      if (data?.responseType === ResponseType.Success) {
        setCategories(data.data || []);
      }
    });

    if (isEditing) {
      fetchProductByIdApi(Number(id)).then(({ data }) => {
        if (data?.responseType === ResponseType.Success) {
          const p = data.data;
          setForm({
            name: p.name,
            brand: p.brand,
            category_id: p.category?.id ?? "",
            SKU: p.SKU,
            weight: p.weight,
            weight_unit: p.weight_unit,
            MRP: Number(p.MRP),
            discount: Number(p.discount),
            selling_price: Number(p.selling_price),
            available_quantity: p.available_quantity,
            packaging_date: p.packaging_date?.slice(0, 10) ?? "",
            expiry_date: p.expiry_date?.slice(0, 10) ?? "",
            description: p.description ?? "",
            extra_note: p.extra_note ?? "",
          });
        }
      });
    }
  }, [id]);

  const set = (field: keyof IProductFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const autoFillSellingPrice = () => {
    const mrp = Number(form.MRP);
    const discount = Number(form.discount);
    if (mrp > 0) {
      const sp = +(mrp - (mrp * discount) / 100).toFixed(2);
      setForm((prev) => ({ ...prev, selling_price: sp }));
    }
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name) e.name = "Required";
    if (!form.brand) e.brand = "Required";
    if (!form.category_id) e.category_id = "Required";
    if (!form.SKU) e.SKU = "Required";
    if (!form.weight) e.weight = "Required";
    if (!form.MRP) e.MRP = "Required";
    if (!form.selling_price) e.selling_price = "Required";
    if (form.available_quantity === "") e.available_quantity = "Required";
    if (!form.packaging_date) e.packaging_date = "Required";
    if (!form.expiry_date) e.expiry_date = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      category_id: Number(form.category_id),
      weight: Number(form.weight),
      MRP: Number(form.MRP),
      discount: Number(form.discount),
      selling_price: Number(form.selling_price),
      available_quantity: Number(form.available_quantity),
    };

    const result = isEditing
      ? await updateProductApi(Number(id), payload)
      : await createProductApi(payload as IProductFormData);

    if (result.data?.responseType === ResponseType.Success) {
      navigate(IAdminRoutes.Products);
    }
  };

  const isBusy = isCreating || isUpdating;

  const Field = ({
    label,
    field,
    type = "text",
    placeholder = "",
    hint,
  }: {
    label: string;
    field: keyof IProductFormData;
    type?: string;
    placeholder?: string;
    hint?: string;
  }) => (
    <div>
      <label className="block text-[12px] font-semibold opacity-60 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={String(form[field])}
        onChange={(e) => set(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 text-[14px] outline-none focus:border-primary ${
          errors[field] ? "border-red-400" : "border-gray-200"
        }`}
      />
      {hint && <p className="text-[11px] opacity-40 mt-0.5">{hint}</p>}
      {errors[field] && (
        <p className="text-[11px] text-red-500 mt-0.5">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="p-8 max-w-[720px]">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(IAdminRoutes.Products)}
          className="text-[13px] opacity-40 hover:opacity-100"
        >
          ← Products
        </button>
        <h1 className="text-[22px] font-bold">
          {isEditing ? "Edit Product" : "Add Product"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Product Name" field="name" placeholder="e.g. Besan" />
          <Field label="Brand" field="brand" placeholder="e.g. Fortune" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-semibold opacity-60 mb-1">
              Category
            </label>
            <select
              value={String(form.category_id)}
              onChange={(e) => set("category_id", e.target.value)}
              className={`w-full border rounded-md px-3 py-2 text-[14px] outline-none focus:border-primary bg-white ${
                errors.category_id ? "border-red-400" : "border-gray-200"
              }`}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-[11px] text-red-500 mt-0.5">
                {errors.category_id}
              </p>
            )}
          </div>
          <Field label="SKU" field="SKU" placeholder="e.g. BES-500G" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Weight" field="weight" type="number" placeholder="500" />
          <div>
            <label className="block text-[12px] font-semibold opacity-60 mb-1">
              Unit
            </label>
            <select
              value={String(form.weight_unit)}
              onChange={(e) => set("weight_unit", e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-[14px] outline-none focus:border-primary bg-white"
            >
              {WEIGHT_UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Stock (qty)"
            field="available_quantity"
            type="number"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 items-end">
          <Field label="MRP (₹)" field="MRP" type="number" />
          <Field
            label="Discount (%)"
            field="discount"
            type="number"
            hint="0 = no discount"
          />
          <div>
            <Field label="Selling Price (₹)" field="selling_price" type="number" />
            <button
              type="button"
              onClick={autoFillSellingPrice}
              className="text-[11px] text-blue-500 hover:underline mt-1"
            >
              Auto-calculate from MRP & discount
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Packaging Date" field="packaging_date" type="date" />
          <Field label="Expiry Date" field="expiry_date" type="date" />
        </div>

        <div>
          <label className="block text-[12px] font-semibold opacity-60 mb-1">
            Description
          </label>
          <textarea
            value={String(form.description)}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-[14px] outline-none focus:border-primary resize-none"
            placeholder="Optional product description..."
          />
        </div>

        <Field
          label="Extra Note"
          field="extra_note"
          placeholder="e.g. Best for making sweets"
          hint="Optional short note shown on product page"
        />

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isBusy}
            className="bg-primary text-white px-6 py-2.5 rounded-md text-[14px] font-medium disabled:opacity-50"
          >
            {isBusy
              ? "Saving..."
              : isEditing
              ? "Save Changes"
              : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate(IAdminRoutes.Products)}
            className="border border-gray-200 px-6 py-2.5 rounded-md text-[14px] text-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
