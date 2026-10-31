import "./App.css";
import ListPlans from "./components/ListPlans/ListPlans";
import { useAuth } from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  console.log(auth.user);

  return (
    <div className="">
      <h1>Добро пожаловать на музыкальный сервис</h1>
      <p>Слушайте музыку до посинения)</p>
      <ListPlans />
    </div>
  );
}

export default App;
