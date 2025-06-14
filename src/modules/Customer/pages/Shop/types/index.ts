import { SortTypes } from "../../../../../types";

export interface IPriceRangeProps {
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface ICategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface IMobileSidebarProps
  extends IPriceRangeProps,
    ICategoryFilterProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMainSidebarProps
  extends IPriceRangeProps,
    ICategoryFilterProps {}

export interface IProductAPiFilters {
  minPrice: number;
  maxPrice: number;
  limit?: number;
  page?: number;
  search?: string;
  sortDirection?: SortTypes;
  sortField?: string;
}

export interface IProducts {
  id: number;
  name: string;
  MRP: number;
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
