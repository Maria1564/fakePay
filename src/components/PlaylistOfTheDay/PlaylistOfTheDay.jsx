import { Music2, Play } from "lucide-react";
import style from "./PlaylistOfTheDay.module.css";

const PlaylistOfTheDay = ({ playlist }) => {
  return (
    <div className={style.playlist}>
      <div className={style.playlist__left}>
        <span className={style.playlist__label}>плейлист дня</span>
        <h3 className={style.playlist__title}>{playlist.name}</h3>
        <button className={style.playlist__button}>
          <Play color="#000000" size={17} />
          <span className={style["playlist__button-text"]}>Слушать</span>
        </button>
      </div>
      <div className={style.playlist__right}>
        {playlist.img ? (
          <img src={playlist.img} className={style.playlist__cover} />
        ) : (
          <div className={style.playlist__placeholder}>
            <Music2 color="#b3aaaa" size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistOfTheDay;
