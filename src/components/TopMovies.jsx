
import React from "react";

const TopMovies = ({ movies }) => {
    const topten = movies.slice(0, 10);

    return (
        <div className="overflow-hidden relative w-full p-6 ">
            <div className="flex animate-scroll gap-6">
                {topten
                    .concat(topten).map((movie, index) => (
                        <div
                            key={index}
                            className="relative min-w-[200px] h-[300px] rounded-xl overflow-hidden  transform hover:scale-105 transition-transform duration-500"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full  p-4">
                                <h2 className="text-white text-lg font-bold">{movie.title}</h2>
                                <p className="text-yellow-400 mt-1">⭐ {movie.vote_average}</p>
                            </div>
                        </div>
                    ))}
            </div>

            <style>
                {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
            
          }
          .animate-scroll {
            display: flex;
            animation: scroll 10s linear infinite;
          }
        `}
            </style>
        </div>
    );
};

export default TopMovies;
