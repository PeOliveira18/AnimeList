import React from "react";
import { Link } from "react-router";

function CardAnimes({ title, image, id }) {
    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-center font-semibold text-base px-2 h-10">{title}</h1>
            <img
                src={image}
                alt={`Foto de ${title}`}
                className="w-[200px] h-[280px] object-cover rounded-lg"
            />
            <Link to={`/AnimeDetail/${id}`}>
                <button className="max-w-[200px] w-full px-4 py-2 bg-[#4B0082] text-white rounded-lg hover:opacity-80 transition-opacity cursor-pointer">
                Saiba mais
                </button>
            </Link>
        </div>
    );
}

export default CardAnimes;
