import { useEffect, useState } from "react";

export const useFetch = (queryFunc) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    queryFunc()
      .then(({ result, response }) => {
        if (!response.ok) {
          setIsError(true);
          setError("Не удалось загрузить данные");
          setData(null);
        } else {
          setIsError(false);
          setError(null);
          setData(result);
        }
      })
      .finally(() => setIsLoading(false));
  }, [queryFunc]);

  return { data, isLoading, isError, error };
};
