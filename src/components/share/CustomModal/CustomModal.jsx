import style from "./CustomModal.module.css";

const CustomModal = ({
  icon,
  title,
  description,
  children,
  firstBtn,
  firstHadleClick,
  secondBtn,
  secondHandleClick,
}) => {
  return (
    <div className={style.modal__overlay}>
      <div className={style.modal__wrapper}>
        {icon}

        <h2 className={style.modal__title}>{title}</h2>
        <p className={style.modal__description}>{description}</p>
        {children}

        <button
          className={`${style.modal__btn} ${style["modal__btn--access"]}`}
          onClick={firstHadleClick}
        >
          {firstBtn}
        </button>
        <button
          className={`${style.modal__btn} ${style["modal__btn--cancel"]}`}
          onClick={secondHandleClick}
        >
          {secondBtn}
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
