import { useNavigate } from "react-router";
import { ROUTES, STATUS_AUTH } from "../../../consts";
import { getAuthCheckStatus } from "../../../helpers";
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
    if (getAuthCheckStatus(configUser) === STATUS_AUTH.guest) {
      navigate(`/${ROUTES.login}`, { replace: true });
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
