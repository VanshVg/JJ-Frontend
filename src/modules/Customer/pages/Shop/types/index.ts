import { SortTypes } from "../../../../../types";

export interface IProductFilters {
  priceRange: number[];
  categories: string[];
}

export interface IFiltersProps {
  filters: IProductFilters;
  setFilters: React.Dispatch<React.SetStateAction<IProductFilters>>;
}

export interface IMobileSidebarProps extends IFiltersProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMainSidebarProps extends IFiltersProps {}

export interface IProductAPiFilters {
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  page?: number;
  search?: string | null;
  sortDirection?: SortTypes;
  sortField?: string;
  category?: string[];
}

export interface IProducts {
  id: number;
  name: string;
  MRP: number;
  discount: number | null;
  selling_price: number;
  average_rating: number | null;
  created_at: Date;
  category: {
    name: string;
  };
  productImages?: {
    image_url: string;
    is_primary: boolean;
    is_secondary: boolean;
  }[];
}

export interface IProductCardProps {
  product: IProducts;
}
