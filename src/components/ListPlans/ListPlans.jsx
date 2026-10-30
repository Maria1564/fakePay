import { useEffect, useState } from "react";
import styles from "./ListPlans.module.css";
import { getAllPlans } from "../../api";
import Plan from "./Plan";
import {useAuth} from "../../hooks/useAuth";

const ListPlans = () => {
  const [plans, setPlan] = useState([]);
  const configUser = useAuth();

  useEffect(() => {
    getAllPlans().then((data) => setPlan(data.plans));
  }, []);


  return (
    <div className={styles.wrapper}>
      Список тарифов
      {plans?.map((plan) => (
        <Plan key={plan.id} plan={plan} configUser={configUser} />
      ))}
    </div>
  );
};

export default ListPlans;
