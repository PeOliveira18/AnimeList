import React from "react";

function CardAnimes({ title, image }) {
    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-center font-semibold text-base px-2 h-10">{title}</h1>
            <img
                src={image}
                alt={`Foto de ${title}`}
                className="w-[200px] h-[280px] object-cover rounded-lg"
            />
            <button className="w-full px-4 py-2 bg-[#4B0082] text-white rounded-lg hover:opacity-80 transition-opacity">
                Saiba mais
            </button>
        </div>
    );
}

export default CardAnimes;
