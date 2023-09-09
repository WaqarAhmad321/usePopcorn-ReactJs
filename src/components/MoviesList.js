import { useMoviesContext } from "../context/MoviesContext";
import { Movie } from "./Movie.js";

export function MoviesList() {
  const { movies } = useMoviesContext();
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
