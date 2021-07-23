import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        setError(err);
      }
    }
    fetchData();
  }, [url]);

  return {
    data,
    error,
  };
}

export default useFetch;
