import { useState, createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useMovies } from "../hooks/useMovies";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const [watchedMovie, setWatchedMovie] = useLocalStorage([], "watched");
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  function handleSelectMovie(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatched(movie) {
    setWatchedMovie((watchedMovie) => [...watchedMovie, movie]);
  }

  function handleDeleteMovie(id) {
    setWatchedMovie((watched) =>
      watched.filter((movie) => movie.imdbID !== id)
    );
  }
  return (
    <MoviesContext.Provider
      value={{
        query,
        setQuery,
        watchedMovie,
        movies,
        isLoading,
        error,
        handleSelectMovie,
        handleAddWatched,
        handleDeleteMovie,
        handleCloseMovie,
        selectedID,
      }}>
      {children}
    </MoviesContext.Provider>
  );
}

function useMoviesContext() {
  const context = useContext(MoviesContext);
  if (context === undefined)
    throw new Error("The movies context was used outside the provider.");
  return context;
}

export { MoviesProvider, useMoviesContext };
