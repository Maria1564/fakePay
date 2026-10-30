import { STATUS_REQUEST } from "./consts";

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

//проверка, авторизован ли пользователь
export const isAuthenticated = (user) => {
  return Boolean(user);
};

//проверка, связанна ли ошибка с авторизацией
export const isUnauthorizedError = (error) => {
  return error?.status === 401;
};

export const getAuthCheckStatus = ({ loading, error, user }) => {
  if (loading) {
    return STATUS_REQUEST.pending;
  }

  if (isAuthenticated(user) || isUnauthorizedError(error)) {
    return STATUS_REQUEST.successful;
  }

  return STATUS_REQUEST.error;
};
