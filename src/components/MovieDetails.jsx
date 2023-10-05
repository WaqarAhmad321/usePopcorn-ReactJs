import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { useKey } from "../hooks/useKey";
import { KEY } from "./App";
import { useMoviesContext } from "../context/MoviesContext";
import Spinner from "./Spinner";

export function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const {
    selectedID,
    watchedMovie,
    handleCloseMovie: onCloseMovie,
    handleAddWatched: onAddWatched,
  } = useMoviesContext();

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Genre: genre,
    Director: director,
  } = movie;

  const isWatched = watchedMovie
    .map((movie) => movie.imdbID)
    .includes(selectedID);
  const watchedUserRating = watchedMovie.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  function handleAddWatchedMovie() {
    const newWatchedMovie = {
      imdbID: selectedID,
      imdbRating: Number(imdbRating),
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
  }

  useKey("Escape", onCloseMovie);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res =
        await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}
      `);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedID]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt="img" />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐ {imdbRating} IMDB rating</span>
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatchedMovie}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie <span>{watchedUserRating}</span>⭐.{" "}
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
