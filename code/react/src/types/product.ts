export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  size: string;
  weight: number;
  currentPrice: number;
  imageUrl: string;
  categoryId: number;
  productType: string;
}

export type ProductPage = {
  content: Product[];
};

export type CreateProduct = {
  name: string;
  brand: string;
  description: string;
  size: string;
  weight: number;
  currentPrice: number;
  imageUrl: string;
  categoryId: number;
  productType: string;
};
