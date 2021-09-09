import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Tag from "./Tag";

export default function MoviePage() {
  const route_params = useParams();

  const [movieData, set_movieData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://omdbapi.com/?apikey=a3dcea5d&i=${route_params.imdb_id}`
      );
      console.log(response.data);
      set_movieData(response.data);
    }
    fetchData();
  }, [route_params.imdb_id]);

  return (
    <div>
      {" "}
      {movieData ? (
        <div>
          <h2>{movieData.Title}</h2>

          <div
            style={{
              display: "flex",
            }}
          >
            {movieData.Genre.split(", ").map((gen) => {
              return <Tag content={gen} />;
            })}
          </div>
          <img src={movieData.Poster} alt={movieData.Title} />

          <div>
            <div>Director: {movieData.Director}</div>
            <div>Language: {movieData.Language}</div>
            <div>Plot: {movieData.Plot}</div>
            <div>imdb Rating: {movieData.imdbRating}</div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
