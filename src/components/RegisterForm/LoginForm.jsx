import { useState } from "react";
import style from "./LoginForm.module.css";
import { user } from "../../data";

const LoginForm = ({ setIsAuth }) => {
  const [fields, setFields] = useState({
    login: "",
    password: "",
  });

  const onLogin = () => {
    if (fields.login !== user.login || fields.password !== user.password) {
      alert("Неверный логин или пароль");
      return;
    }

    setIsAuth(true);
  };

  return (
    <div className={style.wrapper}>
      <form action="">
        <input
          type="text"
          placeholder="логин"
          value={fields.ligon}
          onChange={(e) =>
            setFields((prev) => ({ ...prev, login: e.target.value }))
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
