import { Link, NavLink } from "react-router";
import { LINKS, ROUTES, STATUS_AUTH } from "../../consts";
import { getAuthCheckStatus, getToken } from "../../helpers";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../api";
import style from "./Header.module.css";

const Header = () => {
  const configUser = useAuth();

  const onLogout = async () => {
    await logout(getToken());
    // удаление токена из куки
    document.cookie = "token=; max-age=0; path=/";
    sessionStorage.setItem("isAuth", false);
    configUser.updateAuthState();
  };

  return (
    <div className={style.header}>
      <div className={style.header__nav}>
        {LINKS.map((item) => (
          <NavLink
            key={item.link}
            className={style.header__link}
            to={`/${item.link}`}
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {getAuthCheckStatus(configUser) === STATUS_AUTH.authenticated ? (
        <div className={style.header__actions}>
          <button className={style.header__button} onClick={onLogout}>
            Выйти
          </button>
          <div className={style.header__avatar}>
            {configUser.user.user.name[0].toUpperCase()}
          </div>
        </div>
      ) : (
        <></>
      )}

      {getAuthCheckStatus(configUser) === STATUS_AUTH.guest ? (
        <div className={style.header__actions}>
          <Link className={style.header__button} to={`/${ROUTES.register}`}>
            Регистрация
          </Link>
          <Link className={style.header__button} to={`/${ROUTES.login}`}>
            Вход
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
