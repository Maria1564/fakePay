import { useEffect, useRef, useState } from "react";

export const useToast = (seconds = 3000) => {
  const [toast, setToast] = useState({
    text: "",
    isOpen: false,
  });

  const idTimer = useRef(null);

  const open = (text) => {
    setToast({ text, isOpen: true });
  };

  useEffect(() => {
    if (toast.isOpen && !idTimer.current) {
      idTimer.current = setTimeout(() => {
        setToast({ isOpen: false, value: "" });
        idTimer.current = null;
      },seconds );
    }
  }, [seconds, toast.isOpen]);

  return { text: toast.text, isOpen: toast.isOpen, open };
};
