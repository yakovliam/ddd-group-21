import { useEffect, useRef, useState } from "react";

export type ToastProps = {
  openToast: (title: string, description: string) => void;
  closeToast: () => void;
  providerState: {
    toastIsOpen: boolean;
    setToastIsOpen: (open: boolean) => void;
    title: string;
    description: string;
  };
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
    providerState: {
      toastIsOpen,
      setToastIsOpen,
      title,
      description,
    },
  };
};

export default useToast;
