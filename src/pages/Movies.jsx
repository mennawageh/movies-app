import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

const API_KEY = "49a0f5496f58b89e1b9cb2cb8a35220b";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getMovieImage = (movie) =>
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450/cccccc/666666?text=No+Poster";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        const data = await res.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <div className="container mx-auto p-6">
      {loading && <p className="text-center">Loading movies...</p>}

      {!loading && movies.length > 0 && (
        <>
          <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <Card
                  id={movie.id}
                  title={movie.title}
                  date={movie.release_date}
                  rating={Math.round(movie.vote_average * 10)}
                  image={getMovieImage(movie)}
                  type="movies"
                />
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              setPage={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
