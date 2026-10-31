import { useEffect, useState, useMemo } from "react";
import style from "./ListPlans.module.css";
import { getAllPlans } from "../../api";
import Plan from "./Plan";
import { useAuth } from "../../hooks/useAuth";
import { getAuthCheckStatus } from "../../helpers";
import { ROUTES, STATUS_AUTH } from "../../consts";
import { useModal } from "../../hooks/useModal";
import CustomModal from "../share/CustomModal";
import { Check } from "lucide-react";
import { useNavigate } from "react-router";

const ListPlans = () => {
  const [plans, setPlan] = useState([]);
  const configUser = useAuth();

  const modalPay = useModal();

  const navigate = useNavigate();

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

  const redirectToMusic = () => navigate(`/${ROUTES.home}`, { replace: true });

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
            />
          ))}
        </div>
      </div>

      {!modalPay.isOpen ? (
        <CustomModal
          icon={
            <div className={style.check}>
              <Check color="black" size={34} />
            </div>
          }
          title={"Тариф успешно оплачен"}
          description={`Подписка  активна. Музыка без ограничений уже доступна в вашем аккаунте.`}
          firstBtn={"Перейти к музыке"}
          firstHadleClick={redirectToMusic}
          secondBtn={"Закрыть"}
          secondHandleClick={onCloseModalPay}
        >
          <div className={style.modal__content}>текст</div>
        </CustomModal>
      ) : (
        <></>
      )}
    </>
  );
};

export default ListPlans;
