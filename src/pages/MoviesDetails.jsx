import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Recommend from "./Recommendation";


const API_KEY = "49a0f5496f58b89e1b9cb2cb8a35220b";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);
  

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (!movie) return <p className="text-center py-6">Movie not found</p>;

  return (
    <>
     

      <div className="p-6 max-w-6xl mx-auto text-black dark:text-white ">
        <div className="flex flex-col md:flex-row gap-6">
         
          <div className="poster">
            <img
              src={movie.poster_path ? IMG_URL + movie.poster_path : "https://via.placeholder.com/500x750"}
              alt={movie.title}
              className="w-64 rounded"
            />
          </div>

         
          <div className="flex-1 text-black dark:text-white">
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            <p className=" mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
            <p className=" mb-2"><strong>Rating:</strong> {movie.vote_average}</p>
            <p className=" mb-2">{movie.overview}</p>

          
            <div className="genres mb-2">
              {movie.genres?.map((g) => (
                <span key={g.id} className="bg-yellow-400 text-black px-2 py-1 rounded mr-2 text-sm">
                  {g.name}
                </span>
              ))}
            </div>

           
            <p className="mb-2"><strong>Runtime:</strong> {movie.runtime || "N/A"} Min</p>
            <p className="mb-2"><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>

           
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
              >
                Website ↗
              </a>
            )}
          </div>
        </div>

        <hr className="my-6" />

       
        <Recommend id={id} />
      </div>
    </>
  );
}
