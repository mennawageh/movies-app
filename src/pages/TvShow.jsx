import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../components/card";
import Pagination from "../components/Pagination";

const API_KEY = "825756834f524a6e7be93d98510fb233";

export default function TVShows() {
  const { searchQuery } = useOutletContext();
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const getTVShowImage = (tvShow) =>
    tvShow.poster_path
      ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
      : "https://via.placeholder.com/300x450/cccccc/666666?text=No+Poster";

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);

        const url = searchQuery.trim()
          ? `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
              searchQuery
            )}&page=${page}`
          : `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`;

        const res = await fetch(url);
        const data = await res.json();
        setTvShows(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (err) {
        console.error("Failed to fetch TV shows:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [page, searchQuery]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="tv-container p-6">
      {loading && (
        <div className="loading text-center">
          <div className="spinner"></div>
          <p>{searchQuery ? "Searching..." : "Loading TV shows..."}</p>
        </div>
      )}

      {!loading && tvShows.length === 0 && searchQuery && (
        <div className="not-found text-center">
          <p>No TV shows found for "{searchQuery}"</p>
        </div>
      )}

      {!loading && tvShows.length > 0 && (
        <>
          <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tvShows.map((tvShow) => (
              <Card
                key={tvShow.id}
                id={tvShow.id}
                title={tvShow.name}
                date={tvShow.first_air_date}
                rating={Math.round(tvShow.vote_average * 10)}
                image={getTVShowImage(tvShow)}
                overview={tvShow.overview}
                type="tv"
              />
            ))}
          </div>

          <div className="pagination mt-6 flex justify-center">
            <Pagination
              setPage={handlePageChange}
              totalPages={totalPages}
              currentPage={page}
            />
          </div>
        </>
      )}
    </div>
  );
}
