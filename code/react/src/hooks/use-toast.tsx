import { useEffect, useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";

export type ToastProps = {
  openToast: (title: string, description: string) => void;
  closeToast: () => void;
  toastProvider: React.ReactNode;
};

const useToast = (): ToastProps => {
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const timerRef = useRef(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return {
    openToast: (title: string, description: string) => {
      setToastIsOpen(true);
      setTitle(title);
      setDescription(description);
      timerRef.current = window.setTimeout(() => {
        setToastIsOpen(false);
      }, 5000);
    },
    closeToast: () => {
      setToastIsOpen(false);
    },
    toastProvider: (
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="ToastRoot border border-black bg-gray-200"
          open={toastIsOpen}
          onOpenChange={setToastIsOpen}
        >
          <Toast.Title className="ToastTitle">{title}</Toast.Title>
          <Toast.Description className="ToastDescription">
            {description}
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-8 gap-3 w-96 max-w-screen m-0 list-none !z-50" />
      </Toast.Provider>
    ),
  };
};

export default useToast;
