import { NavLink, Outlet } from "react-router";
import { ROUTES } from "./consts";

const Layout = () => {
  return (
    <div>
      <div className="">
        <div className="">
          <NavLink to={`/${ROUTES.home}`}>Главная</NavLink>
          <NavLink to={`/${ROUTES.home}/${ROUTES.plans}`}>Тарифы</NavLink>
        </div>

        <button>Выйти</button>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
