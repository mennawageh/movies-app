import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


const API_KEY = "825756834f524a6e7be93d98510fb233";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function TVShowDetails() {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setTvShow(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setRecommendations(data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTVShow();
    fetchRecommendations();
  }, [id]);

  if (!tvShow) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
   
      <div className="p-6 max-w-6xl mx-auto text-black dark:text-white ">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={tvShow.poster_path ? IMG_URL + tvShow.poster_path : "https://via.placeholder.com/300x450"}
            alt={tvShow.name}
            className="w-full md:w-64 rounded-xl"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{tvShow.name}</h2>
            <p className="text-gray-300">{tvShow.first_air_date}</p>
            <div className="flex items-center gap-1 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-yellow-400 ${i < Math.round(tvShow.vote_average / 2) ? '' : 'opacity-40'}`}>★</span>
              ))}
              <span className="ml-2 text-gray-300">({tvShow.vote_count} votes)</span>
            </div>
            <p className="mt-4">{tvShow.overview}</p>
            {tvShow.genres && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {tvShow.genres.map((g) => (
                  <span key={g.id} className="bg-yellow-400 text-black px-2 py-1 rounded">{g.name}</span>
                ))}
              </div>
            )}
            {tvShow.homepage && (
              <a href={tvShow.homepage} target="_blank" rel="noreferrer" className="mt-4 inline-block bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition">
                Visit Website ↗
              </a>
            )}
          </div>
        </div>

        <hr className="my-6" />

        <h3 className="text-2xl font-bold mb-4">Recommendations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {recommendations.slice(0, 10).map((rec) => (
            <Link key={rec.id} to={`/tv/${rec.id}`} className="flex flex-col items-center cursor-pointer hover:scale-105 transform transition">
              <img src={rec.poster_path ? IMG_URL + rec.poster_path : "https://via.placeholder.com/200x300"} alt={rec.name} className="rounded-lg" />
              <p className="text-center font-bold mt-2">{rec.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
