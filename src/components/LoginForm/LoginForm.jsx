import { useState } from "react";
import style from "./LoginForm.module.css";
import { login } from "../../api";
import { useNavigate } from "react-router";
import { useToast } from "../../hooks/useToast";

const LoginForm = () => {
  const [fields, setFields] = useState({
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });

  const { text, isOpen, open } = useToast();

  const navigate = useNavigate();

  const onLogin = async () => {
    //валидация
    if (fields.email.value.trim() === "") {
      setFields((prev) => ({
        ...prev,
        email: { ...prev.email, error: "Почта обязательна" },
      }));
      return;
    } else {
      setFields((prev) => ({
        ...prev,
        email: { ...prev.email, error: "" },
      }));
    }

    if (fields.password.value.trim() === "") {
      setFields((prev) => ({
        ...prev,
        password: { ...prev.password, error: "Пароль обязателен" },
      }));
      return;
    } else {
      setFields((prev) => ({
        ...prev,
        password: { ...prev.password, error: "" },
      }));
    }

    const { response, result } = await login({
      email: fields.email.value,
      password: fields.password.value,
    });

    if (!response.ok) {
      //todo показывать тоаст
      open(result.error);
      return;
    }

    document.cookie = `token=${result.token}`;
    navigate("/home", { replace: true });
  };

  return (
    <>
      <div className={style.wrapper}>
        <h1>Вход</h1>
        <form action="">
          <input
            type="text"
            placeholder="почта"
            value={fields.email.value}
            onChange={(e) =>
              setFields((prev) => ({
                ...prev,
                email: { ...prev.email, value: e.target.value },
              }))
            }
          />
          {fields.email.error && (
            <p style={{ color: "red" }}>{fields.email.error}</p>
          )}
          <input
            type="password"
            placeholder="пароль"
            value={fields.password.value}
            onChange={(e) =>
              setFields((prev) => ({
                ...prev,
                password: { ...prev.password, value: e.target.value },
              }))
            }
          />
          {fields.password.error && (
            <p style={{ color: "red" }}>{fields.password.error}</p>
          )}
          <button type="button" onClick={onLogin}>
            Ок
          </button>
        </form>
      </div>

      {isOpen ? <div className="">{text}</div> : null}
    </>
  );
};

export default LoginForm;
