import { useNavigate } from "react-router";
import { isGuest } from "../../../helpers";
import style from "./Plan.module.css";

const Plan = ({
  plan,
  configUser,
  isActivePlan,
  modalOrder,
  setSelectedPlan,
}) => {
  const navigate = useNavigate();

  const onOpenModal = () => {
    if (
      isGuest(
        navigate,
        configUser,
        "Чтобы купить тариф, сначала войдите в аккаунт",
      )
    ) {
      return;
    }
    setSelectedPlan(plan);
    modalOrder.open();
  };

  return (
    <>
      <div className={style.card}>
        <h3 className={style.card__title}>{plan.name}</h3>
        <div className={style.card__info}>
          <span className={style.card__price}>{plan.price}₽</span>{" "}
          <span className={style.card__days}>/ {plan.durationDays} дней</span>
        </div>
        {!isActivePlan && (
          <button
            className={style.card__btn}
            disabled={configUser.loading}
            onClick={onOpenModal}
          >
            Выбрать тариф
          </button>
        )}
      </div>

      {/* {modalOrder.isOpen ? (
        <div>
          Оплатить тариф {plan.name}
          <button onClick={onPay}>Подтвердить</button>
          <button onClick={onCancel}>Отмена</button>
        </div>
      ) : (
        <></>
      )} */}
    </>
  );
};

export default Plan;
