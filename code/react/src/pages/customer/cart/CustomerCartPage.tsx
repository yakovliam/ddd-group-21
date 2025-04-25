import Button from "@/components/ui/Button";
import { useSubmitOrder } from "@/hooks/use-api";
import { useCartStore } from "@/store/store";
import { CartItem } from "@/types/cart";
import { CustomerOrder } from "@/types/customerorder";
import * as Toast from "@radix-ui/react-toast";
import { useEffect, useMemo, useRef, useState } from "react";

const CustomerCartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const cartObject = useMemo(() => {
    return {
      cartItems: cart,
    };
  }, [cart]);

  const [responseData, setResponseData] = useState<CustomerOrder>();
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const onEvent = (
    isSuccess: boolean,
    order?: CustomerOrder,
    message?: string
  ) => {
    setResponseSuccess(isSuccess);
    setResponseData(order);
    setErrorMessage(message);
    clearCart();
    setToastIsOpen(true);
    timerRef.current = window.setTimeout(() => {
      setToastIsOpen(false);
    }, 5000);
  };

  const mutation = useSubmitOrder(
    (data) => {
      onEvent(true, data, undefined);
    },
    (message) => {
      onEvent(false, undefined, message);
    }
  );

  const [toastIsOpen, setToastIsOpen] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="ToastRoot border border-black bg-gray-200"
          open={toastIsOpen}
          onOpenChange={setToastIsOpen}
        >
          <Toast.Title className="ToastTitle">
            Order Placed: {responseSuccess ? "Success" : "Failed"}
          </Toast.Title>
          <Toast.Description asChild>
            <div>
              {errorMessage && (
                <div>
                  <h1>Error</h1>
                  {JSON.stringify(errorMessage)}
                </div>
              )}
              {responseData && (
                <div>
                  <h1>Order Details</h1>
                  {responseData?.id}
                  {responseData?.orderDate}
                  {responseData?.totalAmount}
                </div>
              )}
            </div>
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-8 gap-3 w-96 max-w-screen m-0 list-none !z-50" />
      </Toast.Provider>

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
