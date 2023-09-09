import { useMoviesContext } from "../context/MoviesContext";

export function Movie({ movie }) {
  const { handleSelectMovie: onSelectMovie } = useMoviesContext();

  return (
    <li
      style={{ cursor: "pointer" }}
      onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
