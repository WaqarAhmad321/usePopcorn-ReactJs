import { useMoviesContext } from "../context/MoviesContext";
import { BrowserRouter } from "react-router-dom";
import { MoviesList } from "./MoviesList";
import { MovieDetails } from "./MovieDetails";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";
import { Main } from "./Main";
import { Search } from "./Search";
import { ErrorMessage } from "./ErrorMessage";
import { Navbar } from "./Navbar";
import { Logo } from "./Logo";
import { NumResults } from "./NumResults";
import { Box } from "./Box";
import Spinner from "./Spinner";

export const average = (arr) =>
  arr.reduce((acc, cur, arr) => acc + cur / arr.length, 0);

export const KEY = "92429f8f";

export default function App() {
  const { isLoading, error, movies, selectedID, query } = useMoviesContext();

  return (
    <BrowserRouter>
      <Navbar>
        <Logo />
        <Search />
        <NumResults />
      </Navbar>
      <Main>
        <Box>
          {!isLoading && !error && movies?.length >= 1 ? (
            <MoviesList />
          ) : query?.length > 1 ? (
            <Spinner />
          ) : (
            <p className="loader">Search Movies🎬</p>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails />
          ) : (
            <>
              <WatchedSummary />
              <WatchedList />
            </>
          )}
        </Box>
      </Main>
    </BrowserRouter>
  );
}
