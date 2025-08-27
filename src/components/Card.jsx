import { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getWatchlist, saveWatchlist } from "../utils/watchlist"; // الدوال اللي عملناها

export default function Card({ id, title, date, rating, image, type = "movie" }) {
  const [liked, setLiked] = useState(false);
  const stars = Math.round((rating / 100) * 5);

  // 🟢 عند فتح الصفحة، نشوف إذا الفيلم ده موجود بالفعل في الـWatchlist
  useEffect(() => {
    const list = getWatchlist();
    const exists = list.some((item) => item.id === id && item.type === type);
    setLiked(exists);
  }, [id, type]);

  // 🟢 دالة لإضافة/حذف الفيلم من الـWatchlist
  const toggleWatchlist = (e) => {
    e.preventDefault();
    const list = getWatchlist();

    if (liked) {
      // لو الفيلم موجود → نشيله
      const updated = list.filter((item) => !(item.id === id && item.type === type));
      saveWatchlist(updated);
      setLiked(false);
    } else {
      // لو مش موجود → نضيفه
      const newItem = { id, title, date, rating, image, type };
      saveWatchlist([...list, newItem]);
      setLiked(true);
    }
  };

  return (
    <Link to={`/${type}/${id}`} className="relative w-61 cursor-pointer">
      <div className="relative bg-white dark:bg-[#4A0D1C] text-black dark:text-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105">
        <img src={image} alt={title} className="w-full h-80 object-cover" />

        {/* 🟢 زرار القلب */}
        <button
          onClick={toggleWatchlist}
          className="absolute bottom-3 right-3 p-1 rounded-full z-10"
        >
          <Heart
            size={22}
            fill={liked ? "red" : "none"}
            stroke={liked ? "red" : "currentColor"}
          />
        </button>

        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-gray-500 dark:text-gray-300 text-sm mb-2">{date}</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < stars ? "yellow" : "none"}
                stroke="currentColor"
                className="text-yellow-400"
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
