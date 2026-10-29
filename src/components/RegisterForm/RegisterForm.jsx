import { Link, useNavigate } from "react-router";
import { ROUTES } from "../../consts";
import { useFormField } from "../../hooks/useFormField";
import { register } from "../../api";
import { useToast } from "../../hooks/useToast";

const RegisterForm = () => {
  const name = useFormField("", "Обязательное поле");
  const email = useFormField("", "Обязательное поле");
  const password = useFormField("", "Обязательное поле");

  const toast = useToast();

  const navigate = useNavigate();

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
      toast.open(result.error);
      return;
    }

    document.cookie = `token=${result.token}`;
    navigate(`/${ROUTES.home}`, { replace: true });
  };

  return (
    <>
      <div>
        <h2>Регистрация</h2>
        <form action="">
          <input
            type="text"
            placeholder="имя"
            value={name.value}
            onChange={(event) => name.onChange(event)}
          />
          {name.errorMessage && (
            <p style={{ color: "red" }}>{name.errorMessage}</p>
          )}
          <input
            type="text"
            placeholder="почта"
            value={email.value}
            onChange={(event) => email.onChange(event)}
          />
          {email.errorMessage && (
            <p style={{ color: "red" }}>{email.errorMessage}</p>
          )}
          <input
            type="password"
            placeholder="пароль"
            value={password.value}
            onChange={(event) => password.onChange(event)}
          />
          {password.errorMessage && (
            <p style={{ color: "red" }}>{password.errorMessage}</p>
          )}
          <button type="button" onClick={onRegister}>
            Ок
          </button>
        </form>
        <Link to={`/${ROUTES.login}`}>Вход</Link>
      </div>

      {toast.isOpen ? <div className="">{toast.text}</div> : <></>}
    </>
  );
};

export default RegisterForm;
