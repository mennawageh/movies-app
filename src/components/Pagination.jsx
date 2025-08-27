import React from "react";
import { useState, useEffect } from "react";

export default function Pagination({ currentPage, totalPages, setPage }) {
  const pages = [];

 
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-2 text-white items-center">
      <button
        onClick={() => setPage(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-[#4A0D1C] rounded disabled:opacity-50"
      >
        First
      </button>

      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-[#4A0D1C] rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 rounded ${
            p === currentPage
              ? "bg-yellow-400 text-black font-bold"
              : "bg-[#4A0D1C] hover:bg-yellow-400"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-[#4A0D1C] rounded disabled:opacity-50"
      >
        Next
      </button>

      <button
        onClick={() => setPage(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-[#4A0D1C] rounded disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
}
