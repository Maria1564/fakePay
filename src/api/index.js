//получение пользователя
export const getUser = async (token) => {
  return await fetch("http://localhost:3001/api/account", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
