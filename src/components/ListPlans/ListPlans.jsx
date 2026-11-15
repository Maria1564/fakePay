import { useEffect, useState, useMemo } from "react";
import style from "./ListPlans.module.css";
import { createPayment, getAllPlans, getPayment } from "../../api";
import Plan from "./Plan";
import { useAuth } from "../../hooks/useAuth";
import { getAuthCheckStatus } from "../../helpers";
import { ROUTES, STATUS_AUTH, STATUS_TOAST } from "../../consts";
import { useModal } from "../../hooks/useModal";
import CustomModal from "../share/CustomModal";
import { Check, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";
import { useToast } from "../../hooks/useToast";

const ListPlans = () => {
  const [plans, setPlan] = useState([]);
  const configUser = useAuth();

  const [selectedPlan, setSelectedPlan] = useState(null);

  const modalPay = useModal();
  const modalOrder = useModal();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    getAllPlans().then((data) => setPlan(data.plans));
  }, []);

  const activeUserPlan = useMemo(() => {
    if (
      getAuthCheckStatus(configUser) === STATUS_AUTH.authenticated &&
      configUser.user.user.subscription
    ) {
      return configUser.user.user.subscription.planId;
    }

    return "";
  }, [configUser]);

  const onCloseModalPay = () => modalPay.close();

  const redirectToMusic = () => {
    navigate(`/${ROUTES.home}`, { replace: true });
    modalPay.close();
  };

  const onCancel = () => modalOrder.close();

  const onPay = async (e) => {
    setLoading(true);
    e.target.disabled = true;
    const userId = configUser.user.user.id;
    const planId = selectedPlan.name.toLowerCase();
    const result = await createPayment({ userId, planId });

    await getPayment(result.payment.id);
    modalOrder.close();
    setLoading(false);

    showToast("Тариф успешно приобретён!", STATUS_TOAST.success, 5000);

    modalPay.open();

    await configUser.updateAuthState();
  };

  return (
    <>
      <div className={style.plans__wrapper}>
        <h2>Список тарифов</h2>
        <div className={style.plans__list}>
          {plans?.map((plan) => (
            <Plan
              key={plan.id}
              plan={plan}
              configUser={configUser}
              isActivePlan={plan.name.toLowerCase() === activeUserPlan}
              modalOrder={modalOrder}
              setSelectedPlan={setSelectedPlan}
            />
          ))}
        </div>
      </div>

      {modalPay.isOpen ? (
        <CustomModal
          icon={
            <div className={style.check}>
              <Check color="black" size={34} />
            </div>
          }
          title={"Тариф успешно оплачен"}
          description={`Подписка ${selectedPlan.name} активна. Музыка без ограничений уже доступна в вашем аккаунте.`}
          firstBtn={"Перейти к музыке"}
          firstHadleClick={redirectToMusic}
          secondBtn={"Закрыть"}
          secondHandleClick={onCloseModalPay}
        >
          <div className={style.modal__content}>
            <span className={style.modal__info}>
              {selectedPlan.name} / {selectedPlan.durationDays} дней
            </span>
            <span className={style.modal__price}>{selectedPlan.price}₽</span>
          </div>
        </CustomModal>
      ) : (
        <></>
      )}

      {modalOrder.isOpen ? (
        <CustomModal
          icon={
            <div className={style.shop}>
              <ShoppingBag color="black" size={34} />
            </div>
          }
          title={"Подтвердить покупку"}
          description={`Вы оформляете тариф ${selectedPlan.name} на ${selectedPlan.durationDays} дней. Списание произойдёт сразу после подтверждения.`}
          firstBtn={
            loading ? "Идет оплата..." : `Оплатить ${selectedPlan.price}₽`
          }
          firstHadleClick={onPay}
          secondBtn={"Отмена"}
          secondHandleClick={onCancel}
        >
          <div className={style.modal__content}>
            <span className={style.modal__info}>
              {selectedPlan.name} / {selectedPlan.durationDays} дней
            </span>
            <span className={style.modal__price}>{selectedPlan.price}₽</span>
          </div>
        </CustomModal>
      ) : (
        <></>
      )}
    </>
  );
};

export default ListPlans;
