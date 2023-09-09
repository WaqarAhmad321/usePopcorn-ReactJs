import { useMoviesContext } from "../context/MoviesContext";
import { WatchedMovie } from "./WatchedMovie.js";

export function WatchedList() {
  const { watchedMovie: watched } =
    useMoviesContext();
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
