import { Music2, Play } from "lucide-react";
import style from "./PlaylistItem.module.css";

const PlaylistItem = ({ playlist }) => {
  return (
    <div className={style.playlist__wrapper}>
      <div className={style.playlist__album}>
        {playlist.img ? (
          <img src={playlist.img} alt="" className={style.playlist__img} />
        ) : (
          <div className={style.playlist__circle}>
            <Music2  size={24} color="#b3aaaa" />
          </div>
        )}
        <div className={style.playlist__play}>
          <Play size={14} color="#000" />
        </div>
      </div>
      <h3 className={style.playlist__name}>{playlist.name}</h3>
    </div>
  );
};

export default PlaylistItem;
