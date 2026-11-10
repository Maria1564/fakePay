import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { getUser } from "../../api/index.js";
import { getToken } from "../../helpers.js";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const updateAuthState = () => {
    console.log("call upadate");
    setLoading(true);
    getUser(getToken())
      .then(({ response, result }) => {
        if (!response.ok) {
          setError({ errorMess: result.error, status: response.status });
          setUser(null);
        } else {
          setError(null);
          setUser(result);
        }
      })
      .finally(() => console.log("finaly") || setLoading(false));
  };

  useEffect(() => {
    console.log("useEffect");
    const isAuth = JSON.parse(localStorage.getItem("isAuth"));
    if (isAuth === null) {
      localStorage.setItem("isAuth", false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    if (isAuth && getToken()) {
      updateAuthState();
      console.log("auth");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loading, error, user, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
