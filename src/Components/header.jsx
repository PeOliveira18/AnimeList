import React from "react";
import foto from "../Images/fire.svg";
import { Link } from "react-router-dom";

function Header({search, setSearch}) {

  const handleSearch = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
    
  }

  return (
    <header className="bg-[#1A1A40] py-5 pb-10 shadow-2xl w-full">
      <div className="flex justify-center pb-5 text-center">
        <h1 className="text-[#FFFFFF] text-2xl md:text-3xl">Animes populares</h1>
      </div>
      <div className="flex flex-wrap justify-center mt-4 gap-5 md:gap-11 items-center px-4">
        <Link to='/Popular'>
          <button className="btn-header flex gap-2 items-center">
            Popular <img src={foto} alt="" className="w-5 h-5" />
          </button>
        </Link>
        <form className="relative w-full max-w-xs md:max-w-md">
          <div className="flex items-center bg-white rounded-full border border-gray-300">
            <input
              type="text"
              placeholder="Busque um anime"
              className="px-4 py-2 w-full outline-none"
              value={search}
              onChange={handleSearch}
            
            />
            <button className="btn-header bg-gray-300 px-4 py-2">Buscar</button>
          </div>
        </form>
        <Link to='/Estreando'>
          <button className="btn-header">Estreando</button>
        </Link>
        <Link to='/Upcoming'>
          <button className="btn-header">Estreias</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
