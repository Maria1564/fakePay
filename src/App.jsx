import { useMemo } from "react";
import style from "./App.module.css";
import PlaylistOfTheDay from "./components/PlaylistOfTheDay";
import Playlists from "./components/Playlists";

function App() {
  const playlists = useMemo(
    () => JSON.parse(localStorage.getItem("playlists")),
    [],
  );

  const playlistRandom = playlists[playlists.length - 1];

  return (
    <div className={style.home__container}>
      <div className={style.home__hero}>
        <h1 className={style.home__title}>
          Добро пожаловать на музыкальный сервис
        </h1>
        <p className={style.home__description}>Слушайте музыку до посинения)</p>
      </div>
      <PlaylistOfTheDay playlist={playlistRandom} />
      <Playlists />
    </div>
  );
}

export default App;
