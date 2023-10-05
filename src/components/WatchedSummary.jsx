import { useMoviesContext } from "../context/MoviesContext";
import { average } from "./App";

export function WatchedSummary() {
  const { watchedMovie } = useMoviesContext();

  const avgImdbRating =
    watchedMovie.reduce((sum, movie) => sum + parseFloat(movie.imdbRating), 0) /
    watchedMovie.length;
  const avgUserRating =
    watchedMovie.reduce((sum, movie) => sum + parseFloat(movie.userRating), 0) /
    watchedMovie.length;
  const avgRuntime =
    watchedMovie.reduce((sum, movie) => sum + parseFloat(movie.runtime), 0) /
    watchedMovie.length;

  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watchedMovie.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>
              {isNaN(avgImdbRating?.toFixed(1))
                ? "-"
                : avgImdbRating?.toFixed(1)}
            </span>
          </p>
          <p>
            <span>🌟</span>
            <span>
              {isNaN(avgUserRating?.toFixed(1))
                ? "-"
                : avgImdbRating?.toFixed(1)}
            </span>
          </p>
          <p>
            <span>⏳</span>
            <span>
              {isNaN(avgRuntime?.toFixed(0)) ? "-" : avgImdbRating?.toFixed(1)}{" "}
              min
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
