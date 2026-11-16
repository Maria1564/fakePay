import { getAllTracks } from "../../../api";
import { useFetch } from "../../../hooks/useFetch";

const TrackList = () => {
  const { isLoading } = useFetch(getAllTracks);

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <div className="">треки</div>
    </div>
  );
};

export default TrackList;
