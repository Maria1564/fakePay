import { useEffect, useState } from "react";
import styles from "./ListPlans.module.css";
import Plan from "./Plan";

const getAllPlans = async () => {
  const resp = await fetch("http://localhost:3001/api/plans");

  return resp.json();
};

const ListPlans = () => {
  const [plans, setPlans] = useState(null);

  const [activePlan, setActivePlan] = useState(
    localStorage.getItem("activePlan") || null,
  );

  useEffect(() => {
    getAllPlans().then((res) => {
      setPlans(res.plans);
    });
  }, []);

  console.log("plans >> ", plans);

  return (
    <div className={styles.wrapper}>
      <h1>Тарифы</h1>

      {plans?.map((plan) => (
        <Plan
          key={plan.id}
          plan={plan}
          isActivePlan={plan.id.toLowerCase() === activePlan}
          setActivePlan={setActivePlan}
        />
      ))}
    </div>
  );
};

export default ListPlans;
