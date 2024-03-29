import { useState, useEffect } from 'react';

const useApi = (apiUrl, header) => {
  const [apiData, setApiData] = useState();
  const [url, setUrl] = useState(apiUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (url === '') return;
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch(url, header);
        if (!response.ok) throw response.status;
        const responseJson = await response.json();
        setApiData(responseJson);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
      return apiData;
    };
    fetchData();
    setUrl('');
  }, [apiData, apiUrl, header, url]);

  return [{ apiData, isLoading, isError }, setUrl];
};

export default useApi;
