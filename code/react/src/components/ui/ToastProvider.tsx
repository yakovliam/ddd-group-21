import * as Toast from "@radix-ui/react-toast";

type ToastProps = {
  state: {
    toastIsOpen: boolean;
    setToastIsOpen: (open: boolean) => void;
    title: string;
    description: string;
  };
};

const ToastProvider = ({
  state: { toastIsOpen, setToastIsOpen, title, description },
}: ToastProps) => {
  return (
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
  );
};

export default ToastProvider;
