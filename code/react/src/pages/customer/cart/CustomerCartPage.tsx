import Button from "@/components/ui/Button";
import { CartItem, useCartStore } from "@/store/store";

const CustomerCartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Cart Page</h1>

      <Button
        onClick={() => {
          // send cart to backend

          clearCart();
        }}
      >
        Checkout
      </Button>

      <div className="w-full grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center">
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cart.map((item) => (
              <CartItemComponent
                key={item.id}
                cartItem={item}
                removeFromCart={removeFromCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

type CartItemProps = {
  cartItem: CartItem;
  removeFromCart: (id: string) => void;
};

const CartItemComponent = ({ cartItem, removeFromCart }: CartItemProps) => {
  return (
    <div className="flex flex-col items-center gap-4 border border-gray-300 p-4">
      <p>{cartItem.name}</p>
      <p>{cartItem.price}</p>
      <p>{cartItem.quantity}</p>
      <Button onClick={() => removeFromCart(cartItem.id)}>Remove</Button>
    </div>
  );
};

export default CustomerCartPage;
