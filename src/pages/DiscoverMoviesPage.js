import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieItem from "../components/MovieItem";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function DiscoverMoviesPage() {
  const route_params = useParams();

  const history = useHistory();
  const [title, setTitle] = useState("");
  const [searchState, setsearchState] = useState({ state: "idle", data: [] });

  const search = async (searchTerm) => {
    if (!searchTerm) {
      setsearchState("idle");
      return;
    }
    setsearchState({ state: "Searching" });
    const queryParam = encodeURIComponent(searchTerm);
    try {
      const response = await axios.get(
        `https://omdbapi.com/?apikey=a3dcea5d&s=${queryParam}`
      );
      setsearchState({ state: "done", data: response.data.Search });
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigateToSearch = () => {
    const routeParam = encodeURIComponent(title);
    history.push(`/discover/${routeParam}`);
  };

  useEffect(() => {
    search(route_params.searchtext);
    // setTitle(route_params.searchtext);
  }, [route_params.searchtext]);

  return (
    <div>
      <h1>Discover some movies!</h1>
      <p>
        <input
          type="text"
          value={title}
          placeholder="movie title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>{" "}
        <button
          onClick={() => {
            navigateToSearch();
            search(title);
          }}
        >
          Search
        </button>
      </p>

      {searchState.state === "idle" && (
        <p>Type in a search term and click "Search" to start...</p>
      )}
      {searchState.state === "searching" && <p>Searching...</p>}
      {searchState.state === "done" && (
        <div>
          <h2>Search results</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "0 -10px",
            }}
          >
            {searchState.data.map((movie) => (
              <MovieItem key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
