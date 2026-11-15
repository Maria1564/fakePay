import { useRef, useState } from "react";
import Toast from "./Toast";
import { ToastContext } from "./ToastContext";
import { STATUS_TOAST } from "../../consts";

const ToastProvider = ({ children }) => {
  const [isShow, setIsShow] = useState(false);

  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const timerId = useRef(null);

  const onClose = () => {
    setIsShow(false);

    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
  };

  //показать тоаст
  const showToast = (
    description,
    status = STATUS_TOAST.success,
    duration = 3000,
  ) => {
    if (timerId.current) {
      return;
    }

    setDescription(description);
    setStatus(status);
    setIsShow(true);

    timerId.current = setTimeout(() => {
      setIsShow(false);
      clearTimeout(timerId.current);
      timerId.current = null;
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {isShow && (
        <Toast status={status} description={description} onClose={onClose} />
      )}
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
