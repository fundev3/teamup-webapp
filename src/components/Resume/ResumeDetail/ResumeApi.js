import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await (await axios.get(url)).data;
        setData(res);
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
