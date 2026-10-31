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

//проверка, не является ли пользователь null
export const hasUser = (user) => {
  return Boolean(user);
};

//проверка, связанна ли ошибка с авторизацией
export const isUnauthorizedError = (error) => {
  return error?.status === 401;
};

//статус запроса на получение пользователя
export const getAuthCheckStatus = ({ loading, error, user }) => {
  if (loading) {
    return STATUS_REQUEST.pending;
  }

  if (hasUser(user) || isUnauthorizedError(error)) {
    return STATUS_REQUEST.successful;
  }

  return STATUS_REQUEST.error;
};

//проверка что запрос выполнился и пользователь авторизован
export const isAuthenticated = (configUser) =>
  getAuthCheckStatus(configUser) === STATUS_REQUEST.successful &&
  hasUser(configUser.user);
