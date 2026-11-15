import { login } from "../../api";
import { Link, useLocation, useNavigate } from "react-router";
import { useToast } from "../../hooks/useToast";
import { ROUTES, STATUS_TOAST } from "../../consts";
import { useFormField } from "../../hooks/useFormField";
import { useAuth } from "../../hooks/useAuth";
import Field from "../share/Field";
import style from "../RegisterForm/AuthForm.module.css";

const LoginForm = () => {
  const email = useFormField("", "Поле обязательно");
  const password = useFormField("", "Поле обязательно");

  const { state } = useLocation();
  console.log("state >> ", state);

  const { showToast } = useToast();
  const navigate = useNavigate();

  const { updateAuthState } = useAuth();

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
      showToast(result.error, STATUS_TOAST.error);
      return;
    }

    document.cookie = `token=${result.token}`;
    localStorage.setItem("isAuth", true);
    await updateAuthState();
    navigate(`/${ROUTES.home}`, { replace: true });
  };

  return (
    <div className={style.form}>
      <div className={style.form__wrapper}>
        <h2 className={style.form__title}>Вход</h2>
        <span className={style.form__text}>Рады видеть вас снова</span>
        <form action="" className={style.form__fields}>
          <Field field={email} placeholder={"почта"} />
          <Field field={password} placeholder={"пароль"} typeField="password" />

          <button
            type="button"
            onClick={onLogin}
            className={style.form__button}
          >
            Войти
          </button>
        </form>

        <div className={style.form__footer}>
          {state ? (
            <div className={style.form__warning}>{state.message}</div>
          ) : (
            <></>
          )}
          <span className={style["form__footer-text"]}>
            Нет аккаунта?{" "}
            <Link className={style.form__link} to={`/${ROUTES.register}`}>
              Зарегистрироваться
            </Link>
          </span>
          <Link className={style.form__link} to={`/${ROUTES.home}`}>
            На главный
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
