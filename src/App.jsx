import "./App.css";
import ListPlans from "./components/ListPlans/ListPlans";
import { useAuth } from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  console.log("user >> ", auth.configUser);
  console.log("loading >> ", auth.loading);
  console.log("error >> ", auth.error);

  return (
    <div className="">
      <h1>Добро пожаловать на музыкальный сервис</h1>
      <p>Слушайте музыку до посинения)</p>
      <ListPlans />
    </div>
  );
}

export default App;
