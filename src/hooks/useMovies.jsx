import { useState, useEffect } from "react";
const KEY = "92429f8f";
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    callback?.(); 
    const controller = new AbortController(); 
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          return new Error("Something went wrong with fetching movies.!");
        const data = await res.json();

        if (data.Response === "False") return new Error("Movie not found!");

        setMovies(data.Search);
      } catch (err) {
        if (err !== `AbortError`) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
      setError("");
    }

    if (query.length <= 1) {
      setMovies([]);
      return;
    }
    fetchData();

    return function () {
      controller.abort();
    };
  }, [query]);
  
  return { movies, isLoading, error };
}
