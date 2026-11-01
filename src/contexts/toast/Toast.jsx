import { X } from "lucide-react";
import style from "./Toast.module.css";

const Toast = ({ status, description, onClose }) => {
  return (
    <div className={style.toast__wrapper}>
      <div className={style.toast__left}>
        <div
          className={`${style.toast__indicator} ${style[`toast__indicator--${status}`]}`}
        ></div>
        <p className={style.toast__description}>{description}</p>
      </div>

      <div className={style.toast__icon} onClick={onClose}>
        <X size={16} color="#b3aaaa"></X>
      </div>
    </div>
  );
};

export default Toast;
