import { ProductCategory } from "./productcategory";

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  size: string;
  weight: number;
  currentPrice: number;
  imageUrl: string;
  category: ProductCategory;
  productType: string;
}

export type ProductPage = {
  content: Product[];
};
