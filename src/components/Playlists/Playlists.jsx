import { useState } from "react";
import PlaylistItem from "./PlaylistItem";
import style from "./Playlists.module.css";
import { Link } from "react-router";
import { ROUTES } from "../../consts";

const Playlists = () => {
  const [isShowPanel, setIsShowPanel] = useState({
    idPlaylist: null,
  });

  const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

  return (
    <div className={style.playlists__container}>
      <div className={style.playlists__header}>
        <h2 className={style.playlists__title}>Для вас</h2>
        <Link className={style.playlists__link} to={ROUTES.playlists}>
          Все плейлисты →
        </Link>
      </div>
      {playlists.length ? (
        <div className={style.playlists__list}>
          {playlists.splice(0, 4).map((item) => (
            <PlaylistItem
              key={item.id}
              playlist={item}
              isShow={item.id === isShowPanel.idPlaylist}
              setIsShow={setIsShowPanel}
            />
          ))}
        </div>
      ) : (
        <div>Список пуст</div>
      )}
    </div>
  );
};

export default Playlists;
