import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { isUnauthorizedError } from "../../../helpers";
import { ROUTES } from "../../../consts";
import { useNavigate } from "react-router";
import { createPayment, getPayment } from "../../../api";

const Plan = ({ plan, configUser, isActivePlan }) => {
  const modalOrder = useModal();
  const modalPay = useModal();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onOpenModal = () => {
    if (isUnauthorizedError(configUser.error)) {
      navigate(`/${ROUTES.login}`, { replace: true });
      return;
    }

    modalOrder.open();
  };

  const onCancel = () => modalOrder.close();

  const onPay = async () => {
    modalOrder.close();
    modalPay.open();

    setLoading(true);

    const userId = configUser.user.user.id;
    const planId = plan.name.toLowerCase();
    const result = await createPayment({ userId, planId });

    await getPayment(result.payment.id);
    configUser.updateAuthState();

    setLoading(false);
  };

  return (
    <>
      <div>
        <h3>{plan.name}</h3>
        <p>
          {plan.price} {plan.currency}
        </p>
        {!isActivePlan && (
          <button onClick={onOpenModal} disabled={configUser.loading}>
            Получить
          </button>
        )}
      </div>

      {modalOrder.isOpen ? (
        <div>
          Оплатить тариф {plan.name}
          <button onClick={onPay}>Подтвердить</button>
          <button onClick={onCancel}>Отмена</button>
        </div>
      ) : (
        <></>
      )}

      {modalPay.isOpen ? (
        <div>{loading ? "Обработка данных..." : "Оплата успешно прошла"}</div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Plan;
