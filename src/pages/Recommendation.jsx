import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "49a0f5496f58b89e1b9cb2cb8a35220b";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function Recommend({ id }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setRecommendations(data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecommendations();
  }, [id]);

  if (recommendations.length === 0) return null;

  // Calculate max items for 2 rows (assuming 4 columns per row)
  const itemsPerRow = 4;
  const maxItems = itemsPerRow * 2;
  const displayedRecs = recommendations.slice(0, maxItems);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Recommended Movies</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {displayedRecs.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <img
              src={
                movie.poster_path
                  ? IMG_URL + movie.poster_path
                  : "https://via.placeholder.com/200x300"
              }
              alt={movie.title}
              className="rounded hover:scale-105 transition-transform duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
