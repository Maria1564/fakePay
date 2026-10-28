import { useState } from "react";
import style from "./LoginForm.module.css";

const LoginForm = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const onLogin = () => {
    
  };

  return (
    <div className={style.wrapper}>
      <h1>Вход</h1>
      <form action="">
        <input
          type="text"
          placeholder="почта"
          value={fields.email}
          onChange={(e) =>
            setFields((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="пароль"
          value={fields.password}
          onChange={(e) =>
            setFields((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button type="button" onClick={onLogin}>
          Ок
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
