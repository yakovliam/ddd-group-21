export type SupplierProduct = {
  id: number;
  supplierId: number;
  productId: number;
  price: number;
  minimumOrderQuantity: number;
  leadTimeDays: number;
};
