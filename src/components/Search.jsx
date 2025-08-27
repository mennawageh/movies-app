import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-[#2a0a12] rounded-full px-3 py-1 w-full max-w-md"
    >
      <input
        type="text"
        placeholder="Search and explore..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent outline-none flex-1 text-sm text-white placeholder-gray-300"
      />
      <button type="submit">
        <Search className="text-white cursor-pointer" size={18} />
      </button>
    </form>
  );
}
