import { useMoviesContext } from "../context/MoviesContext";

export function NumResults() {
  const { movies } = useMoviesContext();
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}
