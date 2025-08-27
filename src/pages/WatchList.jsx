import { HeartOff } from "lucide-react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getWatchlist } from "../utils/watchlist";

export default function Watchlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = () => setItems(getWatchlist());
    load();
  
    window.addEventListener("watchlist-updated", load);
    return () => window.removeEventListener("watchlist-updated", load);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Watchlist</h1>

      {items.length === 0 ? (
        <div className="col flex flex-col  text-[#4A0D1C]  items-center justify-center mt-40">
          <HeartOff size={150} color="#EDC700" fill="#EDC700" />
          <p className="text-3xl">No Movies in watch list</p>
        
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card
              key={`${item.type}-${item.id}`}
              id={item.id}
              title={item.title}
              date={item.date}
              rating={item.rating}
              image={item.image}
              type={item.type} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
