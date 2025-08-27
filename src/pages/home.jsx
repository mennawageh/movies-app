import React from 'react'
import MainSection from '../components/Mainsection'
import TopMovies from '../components/TopMovies';
import  { useEffect, useState } from "react";

const API_KEY = "49a0f5496f58b89e1b9cb2cb8a35220b";

const home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error(err));
  }, []);


  return (
    <div>
      <MainSection />
      <div className=" min-h-screen mt-20">
      <h1 className="text-5xl font-bold text-[#4A0D1C] text-center p-6">Top 10 Movies</h1>
      <TopMovies movies={movies} />
    </div>

    </div>
  )
}

export default home