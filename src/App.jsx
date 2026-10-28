import { useState } from "react";
import "./App.css";
import ListPlans from "./components/ListPlans";
import LoginForm from "./components/RegisterForm";

function App() {
  const [isAuth, setIsAuth] = useState(true);

  return <>{isAuth ? <ListPlans /> : <LoginForm setIsAuth={setIsAuth} />}</>;
}

export default App;
