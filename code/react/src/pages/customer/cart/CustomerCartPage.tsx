import Button from "@/components/ui/Button";
import ToastProvider from "@/components/ui/ToastProvider";
import { useSubmitOrder } from "@/hooks/use-api";
import useToast from "@/hooks/use-toast";
import { useCartStore } from "@/store/store";
import { CartItem } from "@/types/cart";
import { CustomerOrder } from "@/types/customerorder";
import { useMemo } from "react";

const CustomerCartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const cartObject = useMemo(() => {
    return {
      cartItems: cart,
    };
  }, [cart]);

  const { openToast, providerState } = useToast();

  const onEvent = (
    isSuccess: boolean,
    _order?: CustomerOrder,
    message?: string
  ) => {
    clearCart();

    if (isSuccess) {
      openToast("Success", "Order created successfully");
    } else {
      openToast("Error", "Failed to create order: " + message);
    }
  };

  const mutation = useSubmitOrder(
    (data) => {
      onEvent(true, data, undefined);
    },
    (message) => {
      onEvent(false, undefined, message);
    }
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <ToastProvider state={providerState} />

      <h1>Cart Page</h1>

      <Button
        onClick={() => {
          mutation.mutate(cartObject);
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
