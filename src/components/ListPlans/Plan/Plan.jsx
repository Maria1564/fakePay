import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { isUnauthorizedError } from "../../../helpers";
import { ROUTES } from "../../../consts";
import { useNavigate } from "react-router";

const Plan = ({ plan, configUser }) => {
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

    // const response = await fetch("http://localhost:3001/api/payments", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     userId: "vasy32",
    //     planId: plan.name.toLowerCase(),
    //   }),
    // });

    // const result = await response.json();

    // await fetch(`http://localhost:3001/api/payments/${result.payment.id}`);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <div>
        <h3>{plan.name}</h3>
        <p>
          {plan.price} {plan.currency}
        </p>
        <button onClick={onOpenModal} disabled={configUser.loading}>
          Получить
        </button>
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
