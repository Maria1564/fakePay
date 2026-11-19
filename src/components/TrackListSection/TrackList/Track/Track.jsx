import { Play } from "lucide-react";
import style from "./Track.module.css";

const Track = ({ track }) => {
  const formatDuration = (sec) => {
    const minute = Math.floor(sec / 60);
    const seconds = sec - minute * 60;
    return `${minute}:${seconds}`;
  };

  return (
    <div className={style.track__wrapper}>
      <div className={style.track__left}>
        <img src={track.coverUrl} alt="" className={style.track__img} />
        <div className={style.track__info}>
          <p className={style.track__title}>{track.title}</p>
          <span className={style.track__artist}>{track.artist.name}</span>
        </div>
      </div>

      <p className={style.track__album}>{track.album.title}</p>

      <div className={style.track__right}>
        <span className={style.track__duration}>
          {formatDuration(track.durationSeconds)}
        </span>
        <div className={style.track__play}>
          <Play size={14} color="#000" />
        </div>
      </div>
    </div>
  );
};

export default Track;
