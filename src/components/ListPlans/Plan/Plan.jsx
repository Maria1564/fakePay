import { useState } from "react";

const Plan = ({ plan, isActivePlan, setActivePlan }) => {
  const [isShowModal, setIsShowModal] = useState({
    modalOrder: false,
    modalPaied: false,
  });

  const [loading, setLoading] = useState(false);

  const onOpenModal = () => {
    setIsShowModal((prev) => ({ ...prev, modalOrder: true }));
  };

  const onCancel = () => {
    setIsShowModal((prev) => ({ ...prev, modalOrder: false }));
  };

  const onPay = async () => {
    setIsShowModal((prev) => ({ ...prev, modalOrder: false }));
    setIsShowModal((prev) => ({ ...prev, modalPaied: true }));

    setLoading(true);

    const response = await fetch("http://localhost:3001/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "vasy32",
        planId: plan.name.toLowerCase(),
      }),
    });

    const result = await response.json();

    await fetch(`http://localhost:3001/api/payments/${result.payment.id}`);
    localStorage.setItem("activePlan", result.payment.planId);
    
    setActivePlan(result.payment.planId);
    setLoading(false);
  };

  return (
    <>
      <div>
        <h3>{plan.name}</h3>
        <p>
          {plan.price} {plan.currency}
        </p>
        <button onClick={onOpenModal} disabled={isActivePlan}>
          Получить
        </button>
      </div>

      {isShowModal.modalOrder ? (
        <div>
          Оплатить тариф {plan.name}
          <button onClick={onPay}>Подтвердить</button>
          <button onClick={onCancel}>Отмена</button>
        </div>
      ) : (
        <></>
      )}

      {isShowModal.modalPaied ? (
        <div>{loading ? "Обработка данных..." : "Оплата успешно прошла"}</div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Plan;
