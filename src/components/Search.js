import { useRef } from "react";
import { useKey } from "../hooks/useKey";
import { useMoviesContext } from "../context/MoviesContext";

export function Search() {
    const inputElement = useRef(null);
    const { query, setQuery: onSetQuery} = useMoviesContext();

    useKey("Enter", function () {
        if (document.activeElement === inputElement.current) return;
        inputElement.current.focus();
        onSetQuery("");
    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => onSetQuery(e.target.value)}
            ref={inputElement} />
    );
}
