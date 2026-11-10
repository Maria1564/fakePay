import { STATUS_AUTH } from "./consts";

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
export const getAuthCheckStatus = ({ loading, error }) => {
  if (loading) {
    return STATUS_AUTH.pending;
  }

  if (JSON.parse(localStorage.getItem("isAuth")) && getToken()) {
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
