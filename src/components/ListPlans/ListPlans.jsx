import { useEffect, useState, useMemo } from "react";
import styles from "./ListPlans.module.css";
import { getAllPlans } from "../../api";
import Plan from "./Plan";
import { useAuth } from "../../hooks/useAuth";
import { getAuthCheckStatus } from "../../helpers";
import { STATUS_AUTH } from "../../consts";

const ListPlans = () => {
  const [plans, setPlan] = useState([]);
  const configUser = useAuth();

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

  return (
    <div className={styles.plans__wrapper}>
      <h2>Список тарифов</h2>
      <div className={styles.plans__list}>
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
  );
};

export default ListPlans;
