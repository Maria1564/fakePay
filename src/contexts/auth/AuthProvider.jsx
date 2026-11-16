import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { getUser } from "../../api/index.js";
import { getToken } from "../../helpers.js";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const getAccountData = async () => {
    const { response, result } = await getUser(getToken());

    if (!response.ok) {
      setError({ errorMess: result.error, status: response.status });
      setUser(null);
    } else {
      setError(null);
      setUser(result);
    }
  };

  const updateAuthState = async () => {
    setLoading(true);

    await getAccountData();

    setLoading(false);
  };

  useEffect(() => {
    const isAuth = JSON.parse(sessionStorage.getItem("isAuth"));
    if (isAuth === null) {
      sessionStorage.setItem("isAuth", false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    } else {
      getAccountData().then(() => setLoading(false));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loading, error, user, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
