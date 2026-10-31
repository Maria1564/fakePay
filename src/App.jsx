import style from "./App.module.css";
import ListPlans from "./components/ListPlans/ListPlans";

function App() {
  return (
    <div className={style.home__container}>
      <div className={style.home__hero}>
        <h1 className={style.home__title}>
          Добро пожаловать на музыкальный сервис
        </h1>
        <p className={style.home__description}>Слушайте музыку до посинения)</p>
      </div>
      <ListPlans />
    </div>
  );
}

export default App;
