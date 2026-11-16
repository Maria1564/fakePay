import { Link } from "react-router";
import { ROUTES } from "../../consts";
import style from "./TrackListSection.module.css";
import TrackList from "./TrackList";

const TrackListSection = () => {
  return (
    <div className={style["track-section__container"]}>
      <div className={style["track-section__header"]}>
        <h2 className={style["track-section__title"]}>Популярные треки</h2>
        <Link to={ROUTES.playlists} className={style["track-section__link"]}>
          Смотреть все →
        </Link>
      </div>
      <TrackList />
    </div>
  );
};

export default TrackListSection;
