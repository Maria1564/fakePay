import { Link, NavLink, Outlet } from "react-router";
import { ROUTES, STATUS_REQUEST } from "./consts";
import { useAuth } from "./hooks/useAuth";
import {
  getAuthCheckStatus,
  hasUser,
  isAuthenticated,
  isUnauthorizedError,
} from "./helpers";

const Layout = () => {
  const configUser = useAuth();

  return (
    <div>
      <div className="">
        <div className="">
          <NavLink to={`/${ROUTES.home}`}>Главная</NavLink>
          <NavLink to={`/${ROUTES.home}/${ROUTES.plans}`}>Тарифы</NavLink>
        </div>

        {isAuthenticated(configUser) ? <button>Выйти</button> : <></>}

        {getAuthCheckStatus(configUser) === STATUS_REQUEST.successful &&
        !hasUser(configUser.user) &&
        isUnauthorizedError(configUser.error) ? (
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
