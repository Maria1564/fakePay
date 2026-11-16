import { Link, useNavigate } from "react-router";
import { ROUTES, STATUS_TOAST } from "../../consts";
import { useFormField } from "../../hooks/useFormField";
import { register } from "../../api";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import Field from "../share/Field";
import style from "./AuthForm.module.css";

const RegisterForm = () => {
  const name = useFormField("", "Обязательное поле");
  const email = useFormField("", "Обязательное поле");
  const password = useFormField("", "Обязательное поле");

  const { showToast } = useToast();

  const navigate = useNavigate();

  const { updateAuthState } = useAuth();

  const onRegister = async () => {
    const nameValid = name.validate();
    const emailValid = email.validate();
    const passwordValid = password.validate();

    if (!nameValid || !emailValid || !passwordValid) {
      return;
    }

    const formData = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    const { response, result } = await register(formData);

    if (!response.ok) {
      showToast(result.error, STATUS_TOAST.error, 5000);
      return;
    }

    document.cookie = `token=${result.token}`;
    sessionStorage.setItem("isAuth", true);
    updateAuthState();
    navigate(`/${ROUTES.home}`, { replace: true });
  };

  return (
    <div className={style.form}>
      <div className={style.form__wrapper}>
        <h2 className={style.form__title}>Регистрация</h2>
        <span className={style.form__text}>Начните слушать бесплатно</span>
        <form action="" className={style.form__fields}>
          <Field field={name} placeholder={"имя"} />

          <Field field={email} placeholder={"почта"} />
          <Field field={password} placeholder={"пароль"} typeField="password" />

          <button
            type="button"
            onClick={onRegister}
            className={`${style.form__button} ${style["form__button--red"]}`}
          >
            Создать аккаунт
          </button>
        </form>

        <div className={style.form__footer}>
          <span className={style["form__footer-text"]}>
            Уже есть аккаунт{" "}
            <Link className={style.form__link} to={`/${ROUTES.login}`}>
              Войти
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

export default RegisterForm;
