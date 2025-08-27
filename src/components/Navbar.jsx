import  { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import SearchBar from "./Search";
import ThemeToggle from "./ThemeToggle";

export default function Navbar( { onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const activeClass = "text-yellow-400 font-semibold";
  const inactiveClass = "hover:text-yellow-300";

  return (
    <nav className="w-full bg-[#4A0D1C] text-white flex items-center justify-between px-6 py-3 relative">
      
      <div className="text-xl font-bold text-yellow-400">
        Movie App
      </div>

    
      <div className="hidden w-80 md:block">
        <SearchBar  onSearch={onSearch} />
      </div>

     
      <ul className="hidden md:flex items-center gap-6">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/tv" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            TV Shows
          </NavLink>
        </li>
        <li>
          <ThemeToggle />
        </li>
        <li className="cursor-pointer ml-3">En</li>
        <li className="cursor-pointer flex  items-center gap-1">
          <Heart className="text-yellow-400" size={22} />
          <NavLink to="/watchlist" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
             Watchlist
          </NavLink>
        </li>
        

      </ul>

     
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#4A0D1C] text-white flex flex-col gap-6 p-6 transform transition-transform duration-300 md:hidden z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        <button
          className="self-end mb-4"
          onClick={() => setMenuOpen(false)}
        >
          <X size={26} />
        </button>

        <SearchBar />
        <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Home</NavLink>
        <NavLink to="/movies" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Movies</NavLink>
        <NavLink to="/tv" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>TV Shows</NavLink>
        <ThemeToggle />
        <span className="cursor-pointer">En</span>
        <NavLink to="/watchlist" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
          <div className="flex items-center gap-1">
            <Heart className="text-yellow-400" size={22} />
            Watchlist
          </div>
        </NavLink>
      </div>
    </nav>
  );
}
