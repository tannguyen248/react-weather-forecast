import { useEffect, useState } from "react";
import { validateStatus } from "../helpers/api";

const useAPI = ({ initialUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    let mounted = true;

    const fetchAPI = async () => {
      if (!url) {
        return
      }

      setIsLoading(true);
      const response = await fetch(url);

      if (mounted && validateStatus(response.status)) {
        const body = await response.json()
        setData(body);
      }

      setIsLoading(false);
    };

    fetchAPI();

    return () => {
      mounted = false;
    };
  }, [url]);

  return [{ isLoading, data }, setUrl];
};

export default useAPI;
