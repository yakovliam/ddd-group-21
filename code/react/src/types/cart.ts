export type Cart = {
  cartItems: CartItem[];
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
};
