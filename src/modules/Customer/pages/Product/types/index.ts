export enum WeightUnits {
  Lbs = "lbs",
  Gram = "g",
  Kg = "kg",
}

export interface IProductDetails {
  id: number;
  name: string;
  brand?: string;
  category: {
    name: string;
  };
  weight: number;
  weight_unit: WeightUnits;
  discount?: number;
  MRP: number;
  selling_price?: number;
  available_quantity: number;
  packaging_date: Date;
  expiry_date: Date;
  average_rating?: number;
  description?: string;
  extra_note?: string;
  productImages?: IProductImages[];
  productReviews?: IProductReviews[];
}

export interface IProductImages {
  image_url: string;
}

export interface IArrowProps {
  clickHandler: () => void;
}

export interface IIndicatorsProps {
  clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void;
  isSelected: boolean;
  index: number;
  label: string;
}

export interface IProductCarouselProps {
  productImages?: IProductImages[];
  discount?: number;
}

export enum ProductDetailsTabs {
  Description = "Description",
  Information = "Information",
  Reviews = "Reviews",
}

export interface IProductReviews {
  rating: number;
  review?: string;
  created_at: Date;
  user: {
    first_name: string;
    last_name: string;
  };
}
