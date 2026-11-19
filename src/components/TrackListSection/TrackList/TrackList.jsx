import { getAllTracks } from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import Track from "./Track/Track";
import style from "./TrackList.module.css";

const TrackList = () => {
  const { isLoading, data } = useFetch(getAllTracks);

  if (isLoading) {
    return <></>;
  }

  console.log("data >> ", data);
  return (
    <div className={style["track-list__wrapper"]}>
      {data.tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
};

export default TrackList;
