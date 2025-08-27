import React from 'react'
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
    return (
        <>
            <Navbar  onSearch={handleSearch}/>
            <main className="min-h-[100lvh]">
                <Outlet  context={{ searchQuery }}/>
            </main>
            
            <Footer />

        </>
    )
}

export default Layout