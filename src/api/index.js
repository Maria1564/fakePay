//получение пользователя
export const getUser = async (token) => {
  const response = await fetch("http://localhost:3001/api/account", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  console.log("getUser")

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

//запрос на  выход из учётки
export const logout = async (token) => {
  await fetch("http://localhost:3001/api/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/*************************  Тарифы ************************/

//запрос на список тарифов
export const getAllPlans = async () => {
  const response = await fetch("http://localhost:3001/api/plans");

  return await response.json();
};

/*************************  Оплата ************************/

//запрос на оплату выбранного тарифа
export const createPayment = async (data) => {
  const response = await fetch("http://localhost:3001/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.json();
};

//запрос на проверку оплаты, и получение данных об оплате
export const getPayment = async (paymentId) => {
  await fetch(`http://localhost:3001/api/payments/${paymentId}`);
};
