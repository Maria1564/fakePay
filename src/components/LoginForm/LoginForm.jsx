import style from "./LoginForm.module.css";
import { login } from "../../api";
import { Link, useNavigate } from "react-router";
import { useToast } from "../../hooks/useToast";
import { ROUTES } from "../../consts";
import { useFormField } from "../../hooks/useFormField";

const LoginForm = () => {
  const email = useFormField("", "Поле обязательно");
  const password = useFormField("", "Поле обязательно");

  const { text, isOpen, open } = useToast();

  const navigate = useNavigate();

  const onLogin = async () => {
    const emailValid = email.validate();
    const passwordValid = password.validate();

    if (!emailValid || !passwordValid) {
      return;
    }

    const { response, result } = await login({
      email: email.value,
      password: password.value,
    });

    if (!response.ok) {
      open(result.error);
      return;
    }

    document.cookie = `token=${result.token}`;
    navigate(`/${ROUTES.home}`, { replace: true });
  };

  return (
    <>
      <div className={style.wrapper}>
        <h1>Вход</h1>
        <form action="">
          <input
            type="text"
            placeholder="почта"
            value={email.value}
            onChange={(e) => email.onChange(e)}
          />
          {email.errorMessage && (
            <p style={{ color: "red" }}>{email.errorMessage}</p>
          )}
          <input
            type="password"
            placeholder="пароль"
            value={password.value}
            onChange={(e) => password.onChange(e)}
          />
          {password.errorMessage && (
            <p style={{ color: "red" }}>{password.errorMessage}</p>
          )}
          <button type="button" onClick={onLogin}>
            Ок
          </button>
        </form>

        <Link to={`/${ROUTES.register}`}>Регистрация</Link>
      </div>

      {isOpen ? <div className="">{text}</div> : null}
    </>
  );
};

export default LoginForm;
