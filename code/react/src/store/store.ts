import { CartItem } from "@/types/cart";
import { create } from "zustand";

type CartStoreState = { cart: CartItem[] };

type CartStoreActions = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

type CartStore = CartStoreState & CartStoreActions;

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const cart = [...state.cart];
      const itemIsInCart = cart.some(
        (cartItem) => cartItem.productId === item.productId
      );

      if (itemIsInCart) {
        cart.forEach((cartItem) => {
          if (cartItem.productId === item.productId) {
            cartItem.quantity += item.quantity;
          }
        });
      } else {
        cart.push(item);
      }

      return { cart };
    }),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  clearCart: () => set({ cart: [] }),
}));
