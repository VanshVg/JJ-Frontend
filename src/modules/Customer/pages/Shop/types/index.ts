export interface IPriceRangeProps {
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface ICategoryFilterProps {
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
