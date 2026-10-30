import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { getUser } from "../../api/index.js";
import { getToken } from "../../helpers.js";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const updateAuthState = () => {
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
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, error, user, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
