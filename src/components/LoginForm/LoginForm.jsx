import style from "./LoginForm.module.css";
import { login } from "../../api";
import { Link, useNavigate } from "react-router";
import { useToast } from "../../hooks/useToast";
import { ROUTES, STATUS_TOAST } from "../../consts";
import { useFormField } from "../../hooks/useFormField";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const email = useFormField("", "Поле обязательно");
  const password = useFormField("", "Поле обязательно");

  const { showToast } = useToast();
  console.log(showToast);
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
    updateAuthState();
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
        <Link to={`/${ROUTES.home}`}>На главный</Link>
      </div>
    </>
  );
};

export default LoginForm;
