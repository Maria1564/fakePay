import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router";
import { getUser } from "./api";
import { getToken } from "./helpers";

// получение данных пользователя их обработка
const getDataAccount = async (token, setUser) => {
  const response = await getUser(token);

  if (!response.ok) {
    setUser({ isAuth: false, info: {} });
    return;
  }

  const result = await response.json();
  setUser({ isAuth: true, info: result });
};

function App() {
  const [user, setUser] = useState({
    isAuth: null,
    info: {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    getDataAccount(getToken(), setUser);
  }, []);

  useEffect(() => {
    if (user.isAuth === false) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user.isAuth]);

  return <h1>Главная страница</h1>;
}

export default App;
