import { Link } from "react-router-dom";
export default function MovieItem({ movie }) {
  return (
    <div
      style={{
        width: "25%",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <Link to={`/movie/${movie.imdbID}`}>
        <strong>{movie.Title}</strong> ({movie.imdbID}){" "}
      </Link>
      <img
        src={movie.Poster}
        alt={movie.Title}
        style={{
          display: "block",
          maxWidth: "100%",
        }}
      />
    </div>
  );
}
