import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { getUser } from "../../api/index.js";
import { getToken } from "../../helpers.js";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [configUser, setConfigUser] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    getUser(getToken())
      .then(({ response, result }) => {
        if (!response.ok) {
          setError(result.error);
        } else {
          setConfigUser(result);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ loading, error, configUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
