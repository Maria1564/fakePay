import { ROUTES, STATUS_AUTH } from "./consts";

// получение токена из куки
export const getToken = () => {
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const key = cookie.split("=")[0].trim();
    const val = cookie.split("=")[1];

    acc[key] = val;

    return acc;
  }, {});
  return cookies.token || "";
};

//проверка, связанна ли ошибка с авторизацией
export const isUnauthorizedError = (error) => {
  return error?.status === 401;
};

//статус запроса на получение пользователя
export const getAuthCheckStatus = ({ user, loading, error }) => {
  if (loading) {
    return STATUS_AUTH.pending;
  }

  if (JSON.parse(localStorage.getItem("isAuth")) && getToken() && user) {
    return STATUS_AUTH.authenticated;
  }
  if (
    isUnauthorizedError(error) ||
    !JSON.parse(localStorage.getItem("isAuth")) ||
    !getToken()
  ) {
    return STATUS_AUTH.guest;
  }

  return STATUS_AUTH.error;
};

//редирект на страницу входа с соообщением
export const redirectToLoginFormWithWarning = (navigate, message) =>
  navigate(`/${ROUTES.login}`, {
    replace: true,
    state: { message },
  });

//проверка, является ли пользователь гостем
export const isGuest = (navigate, configUser, message) => {
  if (getAuthCheckStatus(configUser) === STATUS_AUTH.guest) {
    redirectToLoginFormWithWarning(navigate, message);
    return true;
  }

  return false;
};
