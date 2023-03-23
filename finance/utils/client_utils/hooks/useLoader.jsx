import { useEffect, useState } from 'react';
import { getAccessTokenFromCookie } from '../cookie';

export const useApiCall = (loader) => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = () => {
    setRefresh((prev) => !prev);
  };

  const callApi = async () => {
    const { request, responseHandler, errorHandler } = loader;

    setIsLoading(true);
    try {
      const response = await fetch(request.url, {
        method: request.method,
        headers: {
          'content-Type': 'application/json',
          authorization: getAccessTokenFromCookie(),
        },
        body: request.body ? JSON.stringify(request.body) : undefined,
      });
      const json = await response.json();
      if (responseHandler) {
        setData(responseHandler(json));
      } else setData(json);
    } catch (err) {
      setError(err);
      if (errorHandler) errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, [refresh]);

  return { data, reload, isLoading, error };
};
