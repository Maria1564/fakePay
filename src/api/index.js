//получение пользователя
export const getUser = async (token) => {
  const response = await fetch("http://localhost:3001/api/account", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  return { response, result };
};

//запрос на вход в аккаунт
export const login = async (dataForm) => {
  const response = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataForm),
  });

  const result = await response.json();

  return { response, result };
};

//запрос на регистрацию пользователя
export const register = async (dataForm) => {
  const response = await fetch("http://localhost:3001/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataForm),
  });

  const result = await response.json();

  return { response, result };
};

/*************************  Оплата ************************/

//запрос на список тарифов
export const getAllPlans = async () => {
  const response = await fetch("http://localhost:3001/api/plans");

  return await response.json();
};
