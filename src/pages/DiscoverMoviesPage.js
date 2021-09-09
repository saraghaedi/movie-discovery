import React from "react";
import axios from "axios";
import { useState } from "react";
import MovieItem from "../components/MovieItem";

export default function DiscoverMoviesPage() {
  const [title, setTitle] = useState("");
  const [searchState, setsearchState] = useState({ state: "idle", data: [] });

  const search = async () => {
    if (title === "") {
      setsearchState("idle");
      return;
    }
    console.log("Start searching for:", title);
    setsearchState({ state: "Searching" });
    const queryParam = encodeURIComponent(title);
    try {
      const response = await axios.get(
        `https://omdbapi.com/?apikey=a3dcea5d&s=${queryParam}`
      );
      console.log("Success!", response.data.Search);
      setsearchState({ state: "done", data: response.data.Search });
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("***********", searchState);
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
            search();
            setTitle("");
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
