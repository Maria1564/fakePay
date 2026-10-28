//получение пользователя
export const getUser = async (token) => {
  return await fetch("http://localhost:3001/api/account", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
