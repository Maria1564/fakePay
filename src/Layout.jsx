import { Link, NavLink, Outlet } from "react-router";
import { ROUTES, STATUS_AUTH } from "./consts";
import { useAuth } from "./hooks/useAuth";
import { getAuthCheckStatus } from "./helpers";

const Layout = () => {
  const configUser = useAuth();

  return (
    <div>
      <div className="">
        <div className="">
          <NavLink to={`/${ROUTES.home}`}>Главная</NavLink>
          <NavLink to={`/${ROUTES.home}/${ROUTES.plans}`}>Тарифы</NavLink>
        </div>

        {getAuthCheckStatus(configUser) === STATUS_AUTH.authenticated ? (
          <button>Выйти</button>
        ) : (
          <></>
        )}

        {getAuthCheckStatus(configUser) === STATUS_AUTH.guest ? (
          <>
            <Link to={`/${ROUTES.register}`}>Регистрация</Link>
            <Link to={`/${ROUTES.login}`}>Вход</Link>
          </>
        ) : (
          <></>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
